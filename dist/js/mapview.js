var mapView={displayMap:function(a){var b=null;return b=new google.maps.Map(document.getElementById("map"),{center:{lat:a.lat,lng:a.lng},zoom:13}),null===b&&window.alert("ERROR: Google Maps API was unable to display map"),b},initBounds:function(){return new google.maps.LatLngBounds},initInfoWindow:function(){return new google.maps.InfoWindow},createMapMarker:function(a,b,c,d,e){var f=new google.maps.Marker({map:a,position:c,title:d,animation:google.maps.Animation.DROP,id:e});return f.addListener("click",function(){viewModel.updateSelectedPlace(this.id)}),b.extend(f.position),a.fitBounds(b),f},createInfoWindow:function(a,b){if(b.marker!=a){b.marker=a;var c="<div>"+a.title+"</div>";b.setContent(c),b.open(map,a),b.addListener("closeclick",function(){null!==this.marker&&this.marker.setAnimation(null),this.marker=null})}},highlightMarker:function(a){a.setAnimation(google.maps.Animation.BOUNCE)},unhighlightMarker:function(a){a.setAnimation(null)},updateMarker:function(a,b){a.setVisible(b)},loadPlaceDetails:function(a,b,c){var d=new google.maps.places.PlacesService(a);d.getDetails({placeId:c},function(a,c){if(c===google.maps.places.PlacesServiceStatus.OK){if(a.photos){var d=a.photos[0].getUrl({maxWidth:200,maxHeight:150});""!==d&&viewModel.updatePhoto(b.id,d)}}else window.alert("Google Places search failed due to "+c)})}};