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
      var baseStreetviewURL = 'https://maps.googleapis.com/maps/api/streetview?key=AIzaSyAz3kOqii58xK05S23w4e-NfhwY02oq4Uw&size=200x150&location=';
      return baseStreetviewURL + this.location().lat + ',' + this.location().lng + '';
    }
  }, this);

};

// load Google Places image - Place method
Place.prototype.loadPlaceDetails = function(map) {
  var self = this;

  // query Google Maps Places API
  var service = new google.maps.places.PlacesService(map);
  service.getDetails({
    placeId: self.placeId()
  }, function(place, status) {
    // check for success
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      // check for photos
      if (place.photos) {
        // return 1st photo
        var photoUrl = place.photos[0].getUrl({maxWidth: 200, maxHeight: 150});
        if (photoUrl !== "") {
          self.placesImg(photoUrl);
        }
      }
    } else {
      window.alert('Google Places search failed due to '+ status);
    }
  });

};
