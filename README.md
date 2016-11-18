# Neighborhood Map

This project is a neighborhood map created using the ```Google Maps API``` and other APIs. All code was structured using a Model-View-ViewModel (MVVM) framework, which employs ```Knockout``` to handle links between the data model and the page views.

## Features
* A full-screen map is generated using ```Google Maps APIs```.
* Points of interest are featured in a list-view menu on the sidebar and displayed with markers on the map.
* Using the dropdown menu, the user can filter this list of locations.
* A point of interest may be selected by either clicking on a location in the list-view or on its corresponding marker on the map.
* When selected, additional details about that location are displayed in an ```infowindow```. Its corresponding marker is animated on the map and the ```infowindow``` is opened above the map marker.
* All components are rendered in a responsive manner designed to work on both mobile and desktop.
* On mobile devices, the places list-view is initially off screen and can be accessed via the hamburger menu button in the navbar.

### Skills
* The neighborhood map and markers were implemented using the [Google Maps API](https://developers.google.com/maps/documentation/javascript/).
* The [Knockout framework](http://knockoutjs.com) was employed to handle the places list-view and filter. Knockout uses ```observables``` to track variables and automatically updates their corresponding elements in the ```DOM```.
* ```Google Maps Places API```, ```Google Streetview API```,  [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page), and [Foursquare API](https://developer.foursquare.com/) were employed to download photos and additional information about a selected location.
* ```Wikipedia API``` and ```Foursquare API``` data was requested using jQuery's ```ajax()``` methods.
* JavaScript, CSS, and HTML code was minified using ```Grunt``` build tools. Optimized versions of the code can be found in the ```dist/``` subdirectory on my github repository.

### Viewing my Neighborhood Map

The easiest way to view my neighborhood map is via my github pages [here](https://chspanos.github.io/nieghborhood-map).

Alternatively, you can download a version of the code from my github repository  [here](https://github.com/chspanos/neighborhood-map). A readable version of the source code is located in the ```src/``` subdirectory. A minified and optimized version of the code can be found in the ```dist/``` subdirectory.

_Note:_ The API keys used in this application are restricted to my GitHub pages. You will have to substitute your own API key to run the application on a different server. (Consult the Google Maps API documentation [here](https://developers.google.com/maps/documentation/javascript/get-api-key) for instructions on getting a key.)

#### Using Grunt to create a more optimized executable

I used Grunt on my code to automatically concatenate all my separate model, view, and view-model Javascript into a single file and then minify it. I also minified my CSS and HTML files. The optimized code is stored in the ```dist/``` subdirectory.

Use the following directions to run Grunt:

1. If you don't already have it, download Grunt following the instructions given on the [Grunt Getting Started page](http://gruntjs.com/getting-started).
2. Change to the project root directory
3. In my root directory, you will find the ```package.json``` and ```Gruntfile.js``` files I used for my automations.
4. Install the project dependencies with ```npm install```. My ```Gruntfile.js``` requires installing the following plug-ins:
  * ```npm install grunt-contrib-clean --save-dev```
  * ```npm install grunt-mkdir --save-dev```
  * ```npm install grunt-contrib-copy --save-dev```
  * ```npm install grunt-contrib-cssmin --save-dev```
  * ```npm install grunt-contrib-concat --save-dev```
  * ```npm install grunt-contrib-uglify --save-dev```
  * ```npm install grunt-contrib-htmlmin --save-dev```
5. Run Grunt with ```grunt```.

_Note:_ You will need to substitute your own API keys in the code before executing these steps.

#### Attributions

This application was implemented using the following resources (Click on the links for more information):
* [Google Maps APIs](https://developers.google.com/maps/documentation/javascript/)
* [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page)
* [Foursquare API](https://developer.foursquare.com/)
* [AJAX](http://api.jquery.com/jquery.ajax/)
* [Knockout](http://knockoutjs.com)
