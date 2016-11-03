// ViewModel section

// ViewModel section for interfacing with the places menu
// Implemented in Knockout
var ViewModel = function() {
  var self = this;

  // create a list of filter options
  this.availableFilters = ko.observableArray([]);

  model.options.forEach(function(optionItem) {
    self.availableFilters.push(optionItem);
  });

  // create a list of places of interest
  this.placeList = ko.observableArray([]);

  model.places.forEach(function(placeItem) {
    self.placeList.push(new Place(placeItem));
  });

  // define a selected place
  this.selectedPlace = ko.observable( this.placeList()[0] );

  // when a place is clicked on the menu, this function selects
  // the place and instructs the map to animate and display the
  // corresponding marker
  this.selectPlace = function( selectedPlace ) {
    console.log( selectedPlace.name() + " was selected");
    // reset the selection
    self.selectedPlace( selectedPlace );
    // find the index of the selectedPlace
    var index = self.placeList.indexOf( selectedPlace );
    // have the mapView highlight the corresponding marker for this place
    // and display its data in an infoWindow
    mapView.highlightMarker( index );
  };

  this.updatePlace = function( index ) {
    self.selectedPlace( self.placeList()[ index ] );
  };

};

ko.applyBindings(new ViewModel());

// ViewModel section for interfacing with Google Maps APIs
// Not implemented with Knockout!
var VM = {

  // this function is called by the google maps API callback and
  // kicks off the application
  init: function() {
    mapView.init(model.mapData.location);
    this.createMarkers(model.places);
  },

  // createMarker function traverses the places array and creates
  // a marker for each element on the list
  createMarkers: function(placeArray) {
    // iterate through the placelist
    for (var i = 0; i < placeArray.length; i++) {
      // get postion and name from the place array
      var name = placeArray[i].name;
      var location = placeArray[i].location;
      console.log(name + " has location: " + location.lat + ", " + location.lng);
      // create map marker
      mapView.createMapMarker(location, name, i);
    }
  }

};
