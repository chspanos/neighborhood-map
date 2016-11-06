// The Map View section

var mapView = {

  // Given a lat/lng position, this function draws the initial map
  // and returns the new map if successful
  displayMap: function(location) {
    var map = null;
    // display the map
    map = new google.maps.Map(document.getElementById('map'), {
       center: { lat: location.lat, lng: location.lng },
       zoom: 13
     });
     console.log(map);
     // TODO: if not successful alert with error message
     return map;
   },

   initBounds: function() {
     return( new google.maps.LatLngBounds() );
   },

   initInfoWindow: function() {
     return( new google.maps.InfoWindow() );
   },

  // Given the map, current bounds, place lat/lng position, name, and
  // identifier, create a marker for this location and add it to the map.
  // Also create an event listener for this marker. Return the new marker.
  createMapMarker: function(map, bounds, position, name, id) {
    // create the marker
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: name,
      animation: google.maps.Animation.DROP,
      id: id
    });
    // Create an event listener to animate the marker and open an infowindow
    // when the marker is clicked
    marker.addListener('click', function() {
      viewModel.activateMarker(this);
      // TODO: Shouldn't this also call the ViewModel to update the selectedPlace?
    });
    // If necessary, expand the boundaries of the map to show this marker
    bounds.extend(marker.position);
    map.fitBounds(bounds);
    // return the new marker
    return marker;
  },

  // Given a marker and the infoWindow, this function loads the
  // infoWindow with content from this marker and displays it
  createInfoWindow: function(marker, infowindow) {
    // If the window is not already open on this marker
    if (infowindow.marker != marker) {
      console.log('placeInfoWindow updated for ' + marker.title);
      // load the infowindow content for this place
      infowindow.marker = marker;
      infowindow.setContent('<div>' + marker.title + '</div>');
      infowindow.open(map, marker);
      // Add event listener to clear the marker upon close
      infowindow.addListener('closeclick', function() {
        // stop the BOUNCE
        if ( this.marker !== null ) {
          this.marker.setAnimation( null );
        };
        // clear the marker field
        this.marker = null;
        console.log('placeInfoWindow closed');
      });
    }
  },

  // Given a chosen marker, this function animates the marker
  highlightMarker: function(marker) {
    marker.setAnimation( google.maps.Animation.BOUNCE );
  },

  // Given a chosen marker, this function stops the animation
  unhighlightMarker: function(marker) {
    marker.setAnimation( null );
  }

};
