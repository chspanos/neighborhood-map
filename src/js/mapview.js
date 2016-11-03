// The Map View section

var mapView = {

  // map variables
  map: null, // the Google map
  markers: [], // array of markers
  selectedMarker: null, // selected marker
  placeInfoWindow: null, // infoWindow for showing place information
  bounds: null, // map lat/lng bounds

  // Given a lat/lng position, this function draws the initial map
  init: function(location) {
    // display the map
     this.map = new google.maps.Map(document.getElementById('map'), {
       center: { lat: location.lat, lng: location.lng },
       zoom: 13
     });

     // store current window bounds
     this.bounds = new google.maps.LatLngBounds();

     // define a single infoWindow which all places will share
     this.placeInfoWindow = new google.maps.InfoWindow();

  },

  // Given the place lat/lng position, name, and identifier, create a marker
  // for this location and add it to the map. Also create an event
  // listener for this marker.
  createMapMarker: function(position, name, id) {
    // create the marker
    var marker = new google.maps.Marker({
      map: this.map,
      position: position,
      title: name,
      animation: google.maps.Animation.DROP,
      id: id
    });
    // Push the marker to our array of markers
    this.markers.push(marker);
    // Create an event listener to animate the marker and open an infowindow
    // when the marker is clicked
    marker.addListener('click', function() {
      mapView.highlightMarker(this.id);
      // TODO: Shouldn't this also call the ViewModel to update the selectedPlace?
      // But only the menu can update the KO ViewModel
      // The KO ViewModel can call the map, but not vice versa
    });
    // If necessary, expand the boundaries of the map to show this marker
    this.bounds.extend(marker.position);
    this.map.fitBounds(this.bounds);
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

  // Given the marker index, this function animates the chosen marker and
  // displays its data in the infowindow
  highlightMarker: function(index) {
    // if we have already selected a previous marker, turn it off
    if ( this.selectedMarker !== null ) {
      this.selectedMarker.setAnimation( null );
    }
    // set the new marker
    this.selectedMarker = this.markers[index];
    console.log('Selected Marker is '+ this.selectedMarker.title);
    this.selectedMarker.setAnimation( google.maps.Animation.BOUNCE );
    // display infoWindow with this marker's data
    this.createInfoWindow(this.selectedMarker, this.placeInfoWindow);
  }

};
