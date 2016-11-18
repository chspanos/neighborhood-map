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
     if (map === null) {
       window.alert('ERROR: Google Maps API was unable to display map');
     }
     return map;
   },

   mapError: function() {
     window.alert('ERROR: Google Maps API was unable to generate map');
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
      viewModel.updateSelectedPlace(this.id);
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
      // load the infowindow content for this place
      infowindow.marker = marker;
      var title = '<div>' + marker.title + '</div>';
      infowindow.setContent(title);
      infowindow.open(map, marker);
      // Add event listener to clear the marker upon close
      infowindow.addListener('closeclick', function() {
        // stop the BOUNCE
        if ( this.marker !== null ) {
          this.marker.setAnimation( null );
        }
        // close the window
        this.marker = null;
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
  },

  // Set marker visibility
  updateMarker: function(marker, visibility) {
    marker.setVisible(visibility);
  },

  // funftion to load places details from Google places
  loadPlaceDetails: function(map, marker, placeId) {
    // query Google Maps Places API
    var service = new google.maps.places.PlacesService(map);
    service.getDetails({
      placeId: placeId
    }, function(place, status) {
      // check for success
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // check for photos
        if (place.photos) {
          // return 1st photo
          var photoUrl = place.photos[0].getUrl({maxWidth: 200, maxHeight: 150});
          if (photoUrl !== "") {
            viewModel.updatePhoto(marker.id, photoUrl);
          }
        }
      } else {
        window.alert('Google Places search failed due to '+ status);
      }
    });
  }

};
