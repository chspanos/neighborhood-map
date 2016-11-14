// ViewModel section

var ViewModel = function() {
  var self = this;

  // initialize hamburger menu
  this.menuVisible = ko.observable(false);

  // event handler for the hamburger menu
  this.toggleMenu = function() {
    this.menuVisible( !this.menuVisible() );
  };

  // create a list of filter options
  this.availableFilters = ko.observableArray([]);

  model.options.forEach(function(optionItem) {
    self.availableFilters.push(optionItem);
  });

  // define a selected filter and set to "all" initially
  this.selectedFilter = ko.observable( this.availableFilters()[0] );

  // create a list of places of interest
  this.placeList = ko.observableArray([]);

  model.places.forEach(function(placeItem) {
    self.placeList.push(new Place(placeItem));
  });

  // use the filter to obtain a filtered list of places
  this.filteredList = ko.computed(function() {
    return ko.utils.arrayFilter(this.placeList(), function(place) {
      var chosenType = self.selectedFilter();
      if (chosenType === "all") {
        // display all
        place.isDisplayed(true);
        return true;
      } else {
        // return true if self.selectedFilter is an element of place.types()
        if ( place.types().indexOf(chosenType) >= 0 ) {
          // type match, so mark place as displayed and add to filteredList
          place.isDisplayed(true);
          return true;
        } else {
          // no match, so hide place
          place.isDisplayed(false);
          return false;
        }
      }
    });
  }, this);

  // declare an observable selected place
  this.selectedPlace = ko.observable( null );

  // initialize DOM infowindow
  this.windowVisible = ko.observable(true);

  // event handler for the DOM infowindow click
  this.toggleWindow = function() {
    self.windowVisible( !self.windowVisible() );
  };

  // this function is called by the google maps API callback and
  // kicks off the application
  this.init = function() {
    // display Map and initialize map variables
    model.map = mapView.displayMap(model.mapData.location);
    model.bounds = mapView.initBounds();
    model.placeInfoWindow = mapView.initInfoWindow();
    // load API data - load this upfront, so we only have to call these
    // apps once for each place on our list
    this.loadData();
    // create and display markers
    this.createMarkers();
    // set the selectedPlace to be the first item on the places list
    this.selectPlace( this.placeList()[0] );
  };

  // loadData function traverses the placeList and calls the
  // APIs to load their data
  this.loadData = function() {
    for (var i = 0; i < this.placeList().length; i++) {
      // load Foursquare data
      fourSqView.loadFSData( this.placeList()[i].foursquareId(), i );
      // load Wikipedia link
      wikiView.loadWikiData( this.placeList()[i].name(), i );
    }
  };

  // This function updates the indexed place element with the data
  // returned by the foursquare API
  this.updateFSData = function(index, fourSQUrl, msg) {
    var place = self.placeList()[index];
    if (msg === "Success") {
      place.fourSqLink(fourSQUrl);
      place.fourSqTitle( place.name() );
      place.fourSqMsg( "" );
    } else {
      place.fourSqLink( "" );
      place.fourSqTitle( "" );
      place.fourSqMsg( msg );
    }
  };

  // This function updates the indexed place element with the data
  // returned by the wikipedia API
  this.updateWikiData = function(index, url, title, msg) {
    var place = self.placeList()[index];
    place.wikiLink(url);
    place.wikiTitle(title);
    place.wikiMsg(msg);
  };

  // createMarker function traverses the placeList and creates
  // a marker for each element on the list and adds that marker
  // to the markers array
  this.createMarkers = function() {
    // iterate through the placelist
    for (var i = 0; i < this.placeList().length; i++) {
      var marker;
      // get postion and name from the place array
      var name = this.placeList()[i].name();
      var location = this.placeList()[i].location();
      var placeId = this.placeList()[i].placeId();
      // create map marker
      marker = mapView.createMapMarker(model.map, model.bounds, location, name, i);
      // use Google Maps Places to look up details on the marker
      mapView.loadPlaceDetails(model.map, marker, placeId);
      // Push the marker to our array of markers
      model.markers.push(marker);
    }
  };

  // This function updates the model with the places data returned
  // from the Google Places API
  this.updatePhoto = function(index, imageUrl) {
    self.placeList()[index].placesImg(imageUrl);
  };

  // when a place is selected (either by menu, map click or initialization),
  // this function updates selectedPlace and instructs the map to animate
  // and display its corresponding marker
  this.selectPlace = function(newPlace) {
    if ( newPlace !== self.selectedPlace() ) {
      // reset the selection
      self.toggleSelect(newPlace);
      self.selectedPlace(newPlace);
    }
    // find its corresponding marker
    var index = self.placeList.indexOf(newPlace);
    // highlight the corresponding marker
    // and display its data in an infoWindow
    self.activateMarker( model.markers[index] );
    self.windowVisible(true);
  };

  // Given a placeList index, update and highlight selectedPlace
  this.updateSelectedPlace = function(index) {
    var newPlace = self.placeList()[index];
    self.selectPlace(newPlace);
  };

  // Toggle function to highlight selected places on the menu
  this.toggleSelect = function(place) {
    if ( self.selectedPlace() !== null ) {
      self.selectedPlace().isSelected(false);
    }
    place.isSelected(true);
  }

  // Given a chosen marker, this function animates the
  // chosen marker and displays its data in the infowindow
  this.activateMarker = function(marker) {
    // if we have already selected a previous marker, turn it off
    if ( model.selectedMarker !== null ) {
      mapView.unhighlightMarker( model.selectedMarker );
    }
    // set and animate the new marker
    model.selectedMarker = marker;
    mapView.highlightMarker(marker);
    // display infoWindow with this marker's data
    mapView.createInfoWindow(marker, model.placeInfoWindow);
  };

  // This function monitors the selectedFilter observable and updates
  // the markers when its value changes
  this.selectedFilter.subscribe(function(newValue) {
    // update markers
    for (var i = 0; i < self.placeList().length; i++) {
      mapView.updateMarker( model.markers[i], self.placeList()[i].isDisplayed() );
    }
    // reset the selectedPlace to the first item on the filteredList
    self.selectPlace( self.filteredList()[0] );
  }, this, "change");

};

var viewModel = new ViewModel();
ko.applyBindings(viewModel);
