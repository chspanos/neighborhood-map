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
      "place_id": "ChIJRxvxSlFihYAR7K0dDXrNYTw"
    },
    {
      "name": "Jennie Bickerstaff Tree",
      "address": "3615 Mt Diablo Blvd, Lafayette, CA",
      "location": {
        "lat": 37.8906698,
        "lng": -122.124576
      },
      "types": [ "establishment", "point_of_interest" ],
      "place_id": "ChIJYTuM41lihYAR58-1HjjtoYE"
    },
    {
      "name": "Lafayette Library and Learning Center",
      "address": "3491 Mt Diablo Blvd, Lafayette, CA",
      "location": {
        "lat": 37.89185459999999,
        "lng": -122.1158424
      },
      "types": [ "establishment", "library", "point_of_interest" ],
      "place_id": "ChIJBYwuMVtihYARffszT-0XSBg"
    },
    {
      "name": "M H Stanley Middle School",
      "address": "3455 School St, Lafayette, CA",
      "location": {
        "lat": 37.8869407,
        "lng": -122.1143701
      },
      "types": [ "establishment", "point_of_interest", "school" ],
      "place_id": "ChIJS_VvyUNihYARbB8lgJHLJyM"
    },
    {
      "name": "Lafayette Elementary School",
      "address": "950 Moraga Rd, Lafayette, CA",
      "location": {
        "lat": 37.8888137,
        "lng": -122.1177424
      },
      "types": [ "establishment", "point_of_interest", "school" ],
      "place_id": "ChIJtaIzNFtihYAR_FWVrpZ3P7Q"
    },
    {
      "name": "Artisan Bistro",
      "address": "1005 Brown Ave, Lafayette, CA",
      "location": {
        "lat": 37.8939938,
        "lng": -122.1106254
      },
      "types": [ "bar", "establishment", "food", "point_of_interest", "restaurant" ],
      "place_id": "ChIJM6KKP0ZihYAR2Qm_0TPpFrw"
    },
    {
      "name": "Orchard Nursery and Florist",
      "address": "4010 Mt Diablo Blvd, Lafayette, CA",
      "location": {
        "lat": 37.89033939999999,
        "lng": -122.1521502
      },
      "types": [ "establishment", "florist", "food", "point_of_interest", "store" ],
      "place_id": "ChIJT33wd-BihYARKiJaprWzfkY"
    },
    {
      "name": "Acalanes High School",
      "address": "1200 Pleasant Hill Rd, Lafayette, CA",
      "location": {
        "lat": 37.9029113,
        "lng": -122.0975344
      },
      "types": [ "establishment", "point_of_interest", "school" ],
      "place_id": "ChIJS6QiMDJihYARswhGXvI5h-E"
    }
  ],

  "options": [ "all", "park", "school", "restaurant", "store", "library" ]

};

// create an observable Place function, so we can access our data
var Place = function(data) {
  this.name = ko.observable(data.name);
  this.address = ko.observable(data.address);
  this.location = ko.observable(data.location);
  this.types = ko.observableArray(data.types);
  this.placeId = ko.observable(data.place_id);
  this.isFiltered = ko.observable(false);
  this.isSelected = ko.observable(false);

  this.formattedAddress = ko.computed(function() {
    return this.name + ', ' + this.address;
  }, this);
};
