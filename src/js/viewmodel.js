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

  // deck
  // declare an observable selected place
  this.selectedPlace = ko.observable( null );

  // this function is called by the google maps API callback and
  // kicks off the application
  this.init = function() {
    // display Map and initialize map variables
    model.map = mapView.displayMap(model.mapData.location);
    model.bounds = mapView.initBounds();
    model.placeInfoWindow = mapView.initInfoWindow();
    // create and display markers
    this.createMarkers();
    // set the selectedPlace to be the first item on the places list
    this.selectPlace( this.placeList()[0] );
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
      // create map marker
      marker = mapView.createMapMarker(model.map, model.bounds, location, name, i);
      // Push the marker to our array of markers
      model.markers.push(marker);
    }
  };

  // when a place is selected (either by menu, map click or initialization),
  // this function updates selectedPlace and instructs the map to animate
  // and display its corresponding marker
  this.selectPlace = function(newPlace) {
    if ( newPlace !== self.selectedPlace() ) {
      // reset the selection
      self.toggleSelect(newPlace);
      self.selectedPlace(newPlace);
      // find its corresponding marker
      var index = self.placeList.indexOf(newPlace);
      // highlight the corresponding marker
      // and display its data in an infoWindow
      self.activateMarker( model.markers[index] );
    }
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
    // load data
    var fourSqId = self.selectedPlace().foursquareId();
    fourSqView.loadFSData(fourSqId);
    wikiView.loadWikiData(marker.title);
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

  // This function updates the selectedPlace with the data
  // returned by the foursquare API
  this.updateFSData = function(fourSQUrl, msg) {
    if (msg === "Success") {
      self.selectedPlace().fourSqLink(fourSQUrl);
      self.selectedPlace().fourSqTitle( self.selectedPlace().name() );
      self.selectedPlace().fourSqMsg( "" );
    } else {
      self.selectedPlace().fourSqLink( "" );
      self.selectedPlace().fourSqTitle( "" );
      self.selectedPlace().fourSqMsg( msg );
    }
  };

  // This function updates the selectedPlace with the data
  // returned by the wikipedia API
  this.updateWikiData = function(url, title, msg) {
    self.selectedPlace().wikiLink(url);
    self.selectedPlace().wikiTitle(title);
    self.selectedPlace().wikiMsg(msg);
  };

};

var viewModel = new ViewModel();
ko.applyBindings(viewModel);
