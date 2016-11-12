// Model section
var model = {

  // mapView variables
  "map": null, // the Google map
  "markers": [], // array of markers
  "selectedMarker": null, // selected Marker
  "placeInfoWindow": null, // infoWindow for showing place information
  "bounds": null, // map lat/lng bounds

  // Map location info
  "mapData": {
    "name": "Lafayette, CA, USA",
    "location" : {
       "lat": 37.8857582,
       "lng": -122.1180201
    },
    "place_id": "ChIJhY_6o3xghYARJ2nkA11YKPk"
  },

  // Array of places
  "places": [
    {
      "name": "The Crosses of Lafayette",
      "address": "Deer Hill Rd, Lafayette, CA",
      "location": {
        "lat": 37.895186,
        "lng": -122.123683
      },
      "types": [ "establishment", "park", "point_of_interest", "premise" ],
      "place_id": "ChIJRxvxSlFihYAR7K0dDXrNYTw",
      "foursquare_id": ""
    },
    {
      "name": "Lafayette Reservoir",
      "address": "3849 Mt Diablo Blvd, Lafayette, CA",
      "location": {
        "lat": 37.8847926,
        "lng": -122.145527
      },
      "types": [ "establishment", "park", "point_of_interest" ],
      "place_id": "ChIJd9qeu-1ihYAR447rYG0Eo8M",
      "foursquare_id": "49e3cfdff964a520dd621fe3"
    },
    {
      "name": "Lafayette Library and Learning Center",
      "address": "3491 Mt Diablo Blvd, Lafayette, CA",
      "location": {
        "lat": 37.89185459999999,
        "lng": -122.1158424
      },
      "types": [ "establishment", "library", "point_of_interest" ],
      "place_id": "ChIJBYwuMVtihYARffszT-0XSBg",
      "foursquare_id": "535087d4498e9ee4197d639a"
    },
    {
      "name": "M H Stanley Middle School",
      "address": "3455 School St, Lafayette, CA",
      "location": {
        "lat": 37.8869407,
        "lng": -122.1143701
      },
      "types": [ "establishment", "point_of_interest", "school" ],
      "place_id": "ChIJS_VvyUNihYARbB8lgJHLJyM",
      "foursquare_id": "4b2811aef964a520848e24e3"
    },
    {
      "name": "Lafayette Elementary School",
      "address": "950 Moraga Rd, Lafayette, CA",
      "location": {
        "lat": 37.8888137,
        "lng": -122.1177424
      },
      "types": [ "establishment", "point_of_interest", "school" ],
      "place_id": "ChIJtaIzNFtihYAR_FWVrpZ3P7Q",
      "foursquare_id": "4aabd0f4f964a520345a20e3"
    },
    {
      "name": "Artisan Bistro",
      "address": "1005 Brown Ave, Lafayette, CA",
      "location": {
        "lat": 37.8939938,
        "lng": -122.1106254
      },
      "types": [ "bar", "establishment", "food", "point_of_interest", "restaurant" ],
      "place_id": "ChIJM6KKP0ZihYAR2Qm_0TPpFrw",
      "foursquare_id": "4a1f0c12f964a520fc7b1fe3"
    },
    {
      "name": "Orchard Nursery and Florist",
      "address": "4010 Mt Diablo Blvd, Lafayette, CA",
      "location": {
        "lat": 37.89033939999999,
        "lng": -122.1521502
      },
      "types": [ "establishment", "florist", "food", "point_of_interest", "store" ],
      "place_id": "ChIJT33wd-BihYARKiJaprWzfkY",
      "foursquare_id": "4a81e76bf964a520ebf71fe3"
    },
    {
      "name": "Acalanes High School",
      "address": "1200 Pleasant Hill Rd, Lafayette, CA",
      "location": {
        "lat": 37.9029113,
        "lng": -122.0975344
      },
      "types": [ "establishment", "point_of_interest", "school" ],
      "place_id": "ChIJS6QiMDJihYARswhGXvI5h-E",
      "foursquare_id": "4b46b108f964a520dd2626e3"
    },
    {
      "name": "Lafayette Park Hotel",
      "address": "3287 Mt Diablo Blvd, Lafayette, CA",
      "location": {
        "lat": 37.8960141,
        "lng": -122.1009847
      },
      "types": [ "establishment", "lodging", "point_of_interest" ],
      "place_id": "ChIJJY3FhjlihYARapU2reVVa1M",
      "foursquare_id": "4ada326bf964a520d41f21e3"
    }
  ],

  "options": [ "all", "park", "school", "restaurant", "store", "library", "lodging" ]

};

// create an observable Place function, so we can access our data
var Place = function(data) {
  this.name = ko.observable(data.name);
  this.address = ko.observable(data.address);
  this.location = ko.observable(data.location);
  this.types = ko.observableArray(data.types);
  this.placeId = ko.observable(data.place_id);
  this.foursquareId = ko.observable(data.foursquare_id);
  this.wikiLink = ko.observable("");
  this.wikiTitle = ko.observable("");
  this.wikiMsg = ko.observable("");
  this.fourSqLink = ko.observable("");
  this.fourSqTitle = ko.observable("");
  this.fourSqMsg = ko.observable("");
  this.isDisplayed = ko.observable(true);
  this.isSelected = ko.observable(false);

  this.imgSrc = ko.computed(function() {
    var baseStreetviewURL = 'http://maps.googleapis.com/maps/api/streetview?size=200x150&location=';
    return baseStreetviewURL + this.location().lat + ',' + this.location().lng + '';
  }, this);

};
