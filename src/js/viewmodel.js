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

  // define a selected filter
  this.selectedFilter = ko.observable( this.availableFilters()[0] );

  // create a list of places of interest
  this.placeList = ko.observableArray([]);

  model.places.forEach(function(placeItem) {
    self.placeList.push(new Place(placeItem));
  });

  // define a selected place
  this.selectedPlace = ko.observable( this.placeList()[0] );

  // this function is called by the google maps API callback and
  // kicks off the application
  this.init = function() {
    // display Map and initialize map variables
    model.map = mapView.displayMap(model.mapData.location);
    model.bounds = mapView.initBounds();
    model.placeInfoWindow = mapView.initInfoWindow();
    // create and display markers
    this.createMarkers();
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
      console.log(name + " has location: " + location.lat + ", " + location.lng);
      // create map marker
      marker = mapView.createMapMarker(model.map, model.bounds, location, name, i);
      // Push the marker to our array of markers
      model.markers.push(marker);
    }
  };

  // when a place is clicked on the menu, this function selects
  // the place and instructs the map to animate and display the
  // corresponding marker
  this.selectPlace = function( selectedPlace ) {
    console.log( selectedPlace.name() + " was selected");
    // reset the selection
    self.selectedPlace( selectedPlace );
    // find its corresponding marker
    var index = self.placeList.indexOf( selectedPlace );
    // highlight the corresponding marker for this place
    // and display its data in an infoWindow
    self.activateMarker( model.markers[index] );
  };

  // Given a chosen marker, this function animates the
  // chosen marker and displays its data in the infowindow
  this.activateMarker = function(marker) {
    // if we have already selected a previous marker, turn it off
    if ( model.selectedMarker !== null ) {
      mapView.unhighlightMarker( model.selectedMarker );
    }
    // set and animate the new marker
    model.selectedMarker = marker;
    console.log('Selected Marker is '+ marker.title);
    mapView.highlightMarker(marker);
    // display infoWindow with this marker's data
    mapView.createInfoWindow(marker, model.placeInfoWindow);
  };

  // This function monitors the selectedFilter observable and executes
  // the provided function when its value changes
  this.selectedFilter.subscribe(function(newValue) {
    console.log('Selected filter is ' + newValue );
  }, this, "change");

};

var viewModel = new ViewModel();
ko.applyBindings(viewModel);
