# Neighborhood Map

This project is a neighborhood map created using the ```Google Maps API``` and other APIs. All code was structured using a Model-View-ViewModel (MVVM) framework, which employs ```Knockout``` to handle links between the data model and the page views.

## Features
* A full-screen map is generated using ```Google Maps APIs```.
* Points of interest are featured in a list-view menu on the sidebar and displayed with markers on the map.
* Using the dropdown menu, the user can filter this list of locations.
* A point of interest may be selected by either clicking on a location in the list-view or on its corresponding marker on the map.
* When selected, additional details about that location are displayed in a separate window. Its corresponding marker is animated on the map and a smaller ```infowindow``` is opened above the map marker.
* All components are rendered in a responsive manner designed to work on both mobile and desktop.
* On mobile devices, the places list-view is initially off screen and can be accessed via the hamburger menu button in the navbar.

### Skills
* The neighborhood map and markers were implemented using the [Google Maps API](https://developers.google.com/maps/documentation/javascript/).
* The [Knockout framework](http://knockoutjs.com) was employed to handle the places list-view, filter, and the larger ```DOM``` information window. Knockout uses ```observables``` to track variables and automatically updates their corresponding elements in the ```DOM```.
* The ```Google Maps Places API```, ```Google Streetview API```, the [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page), and the [Foursquare API](https://developer.foursquare.com/) were employed to download photos and additional information about a selected location.
* ```Wikipedia API``` and ```Foursquare API``` data was requested using jQuery's ```ajax()``` methods.
* All JavaScript, CSS, and HTML code was minified using ```Grunt``` build tools. Optimized versions of the code can be found in the ```dist``` directory on my github repository.

## Running the application

You can run this application on my GitHub page [here](https://chspanos.github.io/neighborhood-map).

Alternatively, you can download a version of the code from this github [repository](https://github.com/chspanos/neighborhood-map). A readable version of the source code is located in the ```src``` directory. A minified and optimized version of the code can be found in the ```dist``` directory.

Note: The API keys used in this application are restricted to my GitHub pages. You will have to substitute your own API key to run the application on a different server. (Consult the Google Maps API documentation [here](https://developers.google.com/maps/documentation/javascript/get-api-key) for instructions on getting a key.)

#### Attributions

This application was implemented using the following resources (See links for more information):
* [Google Maps APIs](https://developers.google.com/maps/documentation/javascript/)
* [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page)
* [Foursquare API](https://developer.foursquare.com/)
* [AJAX](http://api.jquery.com/jquery.ajax/)
* [Knockout](http://knockoutjs.com)
