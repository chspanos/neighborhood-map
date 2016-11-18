// Model section
var model = {

  // mapView variables
  "map": null,
  "markers": [],
  "selectedMarker": null,
  "placeInfoWindow": null,
  "bounds": null,

  // Map location info
  "mapData": {
    "name": "Lafayette, CA, USA",
    "location" : {
       "lat": 37.8857582,
       "lng": -122.1180201
    }
  },

  // Array of places
  "places": [{
      "name": "Lafayette Reservoir",
      "address": "3849 Mt Diablo Blvd, Lafayette, CA",
      "location": {
        "lat": 37.884793,
        "lng": -122.145527
      },
      "types": ["establishment", "park", "point_of_interest"],
      "placeId": "ChIJd9qeu-1ihYAR447rYG0Eo8M",
      "foursquareId": "49e3cfdff964a520dd621fe3"
    },
    {
      "name": "Lafayette Hillside Memorial",
      "altName": "The Crosses of Lafayette",
      "address": "Deer Hill Rd, Lafayette, CA",
      "location": {
        "lat": 37.895186,
        "lng": -122.123683
      },
      "types": ["establishment", "park", "point_of_interest", "premise"],
      "placeId": "ChIJRxvxSlFihYAR7K0dDXrNYTw",
      "foursquareId": "4d3b29d7325ff04dac782345"
    },
    {
      "name": "Lafayette Library and Learning Center",
      "address": "3491 Mt Diablo Blvd, Lafayette, CA",
      "location": {
        "lat": 37.89185459999999,
        "lng": -122.1158424
      },
      "types": ["establishment", "library", "point_of_interest"],
      "placeId": "ChIJBYwuMVtihYARffszT-0XSBg",
      "foursquareId": "535087d4498e9ee4197d639a"
    },
    {
      "name": "Lafayette Elementary School",
      "address": "950 Moraga Rd, Lafayette, CA",
      "location": {
        "lat": 37.8888137,
        "lng": -122.1177424
      },
      "types": ["establishment", "point_of_interest", "school"],
      "placeId": "ChIJtaIzNFtihYAR_FWVrpZ3P7Q",
      "foursquareId": "4aabd0f4f964a520345a20e3"
    },
    {
      "name": "Artisan Bistro",
      "address": "1005 Brown Ave, Lafayette, CA",
      "location": {
        "lat": 37.8939938,
        "lng": -122.1106254
      },
      "types": ["bar", "establishment", "food", "point_of_interest", "restaurant"],
      "placeId": "ChIJM6KKP0ZihYAR2Qm_0TPpFrw",
      "foursquareId": "4a1f0c12f964a520fc7b1fe3"
    },
    {
      "name": "Orchard Nursery and Florist",
      "address": "4010 Mt Diablo Blvd, Lafayette, CA",
      "location": {
        "lat": 37.89033939999999,
        "lng": -122.1521502
      },
      "types": ["establishment", "florist", "food", "point_of_interest", "store"],
      "placeId": "ChIJT33wd-BihYARKiJaprWzfkY",
      "foursquareId": "4a81e76bf964a520ebf71fe3"
    },
    {
      "name": "Acalanes High School",
      "address": "1200 Pleasant Hill Rd, Lafayette, CA",
      "location": {
        "lat": 37.9029113,
        "lng": -122.0975344
      },
      "types": ["establishment", "point_of_interest", "school"],
      "placeId": "ChIJS6QiMDJihYARswhGXvI5h-E",
      "foursquareId": "4b46b108f964a520dd2626e3"
    },
    {
      "name": "Lafayette Park Hotel",
      "address": "3287 Mt Diablo Blvd, Lafayette, CA",
      "location": {
        "lat": 37.8960141,
        "lng": -122.101025
      },
      "types": ["establishment", "lodging", "point_of_interest"],
      "placeId": "ChIJJY3FhjlihYARapU2reVVa1M",
      "foursquareId": "4ada326bf964a520d41f21e3"
    },
    {
      "name": "Uncle Yu's",
      "address": "999 Oak Hill Rd, Lafayette, CA",
      "location": {
        "lat": 37.8923289,
        "lng": -122.1207499
      },
      "types": ["establishment", "food", "point_of_interest", "restaurant"],
      "placeId": "ChIJ3UQEflBihYARtJ_sy15TMfI",
      "foursquareId": "4b11ed12f964a520128723e3"
    },
    {
      "name": "Lafayette Community Garden",
      "address": "3932 Mt Diablo Blvd, Lafayette, CA",
      "location": {
        "lat": 37.8892375,
        "lng": -122.14153
      },
      "types": ["establishment", "park", "point_of_interest"],
      "placeId": "ChIJP_FAx-RihYARLCNN_G67_fg",
      "foursquareId": "5658d31e498e840922293eae"
    }
  ],

  "options": ["all", "park", "school", "food", "library", "lodging"]

};

// create an observable Place function, so we can access our data
var Place = function(data) {
  this.name = ko.observable(data.name);
  this.altName = ko.observable(data.altName);
  this.address = ko.observable(data.address);
  this.location = ko.observable(data.location);
  this.types = ko.observableArray(data.types);
  this.placeId = ko.observable(data.placeId);
  this.foursquareId = ko.observable(data.foursquareId);
  this.fourSqLink = ko.observable("");
  this.fourSqTitle = ko.observable("");
  this.fourSqMsg = ko.observable("");
  this.fourSqCategories = ko.observable("");
  this.wikiLink = ko.observable("");
  this.wikiTitle = ko.observable("");
  this.wikiMsg = ko.observable("");
  this.placesImg = ko.observable("");
  this.isDisplayed = ko.observable(true);
  this.isSelected = ko.observable(false);

  this.imgSrc = ko.computed(function() {
    if (this.placesImg() !== "") {
      // return Google Places image, if we have one
      return this.placesImg();
    } else {
      // load Google Streetview image
      var baseStreetviewURL = 'http://maps.googleapis.com/maps/api/streetview?key=AIzaSyAz3kOqii58xK05S23w4e-NfhwY02oq4Uw&size=200x150&location=';
      return baseStreetviewURL + this.location().lat + ',' + this.location().lng + '';
    }
  }, this);

};

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
      //var title = '<div>' + marker.title + '</div>';
      var innerHTML = viewModel.setInnerHTML();
      infowindow.setContent(innerHTML);
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

// Foursquare View
var CLIENT_ID = 'IDA2YR42QMPJ0O04TMIIGNX42BMNK4Z3UGQTVY2DFF5I2MSV';
var CLIENT_SECRET = 'SZ3FOYMEK0530G2JDCSHAUJSRPMMYKFFKIFITLFFZ1P01CWI';

var fourSqView = {

  loadFSData: function(placeId, index) {

    var version = 20160108;
    var baseUrl = 'https://api.foursquare.com/v2/venues';
    var fourSqUrl = baseUrl + '/' + placeId;

    $.ajax({
      url: fourSqUrl,
      data: {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "v": version,
        "async": true,
      },
      dataType: "json"
    }).done(function(data) {
      // data found, so do something with it
      var placeUrl = data.response.venue.canonicalUrl;
      var msg = 'Success';

      var categories = "";
      var typesList = data.response.venue.categories;
      for (var i = 0; i < typesList.length; i++) {
        categories += typesList[i].name;
        if (i < (typesList.length - 1)) {
          categories += ', ';
        }
      }

      // update viewModel with foursquare data
      viewModel.updateFSData(index, placeUrl, categories, msg);

    }).fail(function(e) {
      var placeUrl = "";
      var categories = "";
      var msg = 'Foursquare search failed for this location';
      viewModel.updateFSData(index, placeUrl, categories, msg);
    });

    return false;
  }
};

// Wikipedia data view

var wikiView = {

  loadWikiData: function(placeName, index) {

    // load wikipedia data
    var wikiBaseUrl = 'http://en.wikipedia.org/w/api.php';

    $.ajax({
      url: wikiBaseUrl,
      data: {
        "action": "opensearch",
        "search": placeName,
        "format": "json",
        "async": true
      },
      dataType: "jsonp",
      jsonp: "callback"
    }).done(function(data) {
      // data found, so do something with it
      var titles = data[1];
      var urls = data[3];
      if (titles.length > 0) {
        // pull out data
        var title = titles[0];
        var url = urls[0];
        // update place with first match
        viewModel.updateWikiData(index, url, title, '');
      } else {
        // Oops! Search returned an empty array but no error
        viewModel.updateWikiData(index, '', '', 'No matching Wikipedia entries found');
      }
    }).fail(function(e) {
      viewModel.updateWikiData(index, '', '', 'Wikipedia search failed for this location');
    });

    return false;
  }
};

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
      if (chosenType === 'all') {
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
  this.updateFSData = function(index, fourSQUrl,categories, msg) {
    var place = self.placeList()[index];
    if (msg === 'Success') {
      place.fourSqLink(fourSQUrl);
      place.fourSqTitle( place.name() );
      place.fourSqCategories(categories);
      place.fourSqMsg("");
    } else {
      place.fourSqLink("");
      place.fourSqTitle("");
      place.fourSqMsg(msg);
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
  }, this, 'change');

  // This function creates the HTML content for the map infowindow using
  // data from the selected place. It is called by the mapView and returns
  // its HTML for mapView to use in a marker infowindow.
  // Note: KO cannot be used to load a Google Maps infowindow 
  this.setInnerHTML = function() {
    var place = self.selectedPlace();
    var innerHTML = '';
    // load title
    innerHTML += '<h3 class="info-header">' + place.name() + '</h3>';
    // load address
    innerHTML += '<p>' + place.address() + '</p>';
    // load categories
    innerHTML += '<p>' + place.fourSqCategories() + '</p>';
    // load image
    innerHTML += '<img src="' + place.imgSrc() + '" alt="place image">';
    // load foursquare link
    innerHTML += '<p class="fa-foursquare">';
    innerHTML += '<a href="' + place.fourSqLink() + '">' + place.fourSqTitle() + '</a>';
    innerHTML += '<span>' + place.fourSqMsg() + '</span>';
    // load wikipedia link
    innerHTML += '<p class="fa-wikipedia-w">';
    innerHTML += '<a href="' + place.wikiLink() + '">' + place.wikiTitle() + '</a>';
    innerHTML += '<span>' + place.wikiMsg() + '</span>';
    // load attribution
    innerHTML += '<p class="attributions">Images courtesy of Google Places and ' +
      ' StreetView APIs. Wikipedia link courtesy of Wikipedia API. ' +
      'Categories and link courtesy of Foursquare API.</p>';
    return innerHTML;
  };

};

var viewModel = new ViewModel();
ko.applyBindings(viewModel);
