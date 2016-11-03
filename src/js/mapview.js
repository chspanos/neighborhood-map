// The Map View section

// Global map variables
var map; // the map
var markers = []; // the array of markers
var selectedMarker = null; // selected marker
var placeInfoWindow; // infoWindow for showing place infomation
var bounds; // map lat/lng bounds

var mapView = {

  // function which draws the initial map
  init: function(location) {
    // display the map
     map = new google.maps.Map(document.getElementById('map'), {
       center: { lat: location.lat, lng: location.lng },
       zoom: 13
     });

     // store current window bounds
     bounds = new google.maps.LatLngBounds();

     // define a single infoWindow which all places will share
     placeInfoWindow = new google.maps.InfoWindow();

  },

  // Given the place lat/lng position, name, and identifier, create a marker
  // for this location and add it to the map. Also create an event
  // listener for this marker.
  createMapMarker: function(position, name, id) {
    // create the marker
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: name,
      animation: google.maps.Animation.DROP,
      id: id
    });
    // Push the marker to our array of markers
    markers.push(marker);
    // Create an event listener to animate the marker and open an infowindow
    // when the marker is clicked
    marker.addListener('click', function() {
      mapView.highlightMarker(this.id);
      // TODO: Shouldn't this also call the ViewModel to update the selectedPlace?
      // Only the menu can update the KO ViewModel
      // The KO ViewModel can call the map, but not vice versa
    });
    // If necessary, expand the boundaries of the map to show this marker
    bounds.extend(marker.position);
    map.fitBounds(bounds);
  },

  // Given a marker and the infoWindow, this function loads the
  // infoWindow with content from this marker and displays it
  createInfoWindow: function(marker, infowindow) {
    // If the window is not already open on this marker
    if (infowindow.marker != marker) {
      console.log('placeInfoWindow updated for ' + marker.title);
      // load the content for this place
      infowindow.marker = marker;
      // Initial content is just the place name
      infowindow.setContent('<div>' + marker.title + '</div>');
      // display the infowindow
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

  // Given the marker index, this function animates the chosen marker and
  // displays its data in the infowindow
  highlightMarker: function(index) {
    // if we have already selected a previous marker, turn it off
    if ( selectedMarker !== null ) {
      selectedMarker.setAnimation( null );
    }
    // set the new marker
    selectedMarker = markers[index];
    console.log('Selected Marker is '+ selectedMarker.title);
    selectedMarker.setAnimation( google.maps.Animation.BOUNCE );
    // display infoWindow with this marker's data
    this.createInfoWindow(selectedMarker, placeInfoWindow);
  }

};
