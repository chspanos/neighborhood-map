// Foursquare View
var CLIENT_ID = 'IDA2YR42QMPJ0O04TMIIGNX42BMNK4Z3UGQTVY2DFF5I2MSV';
var CLIENT_SECRET = 'SZ3FOYMEK0530G2JDCSHAUJSRPMMYKFFKIFITLFFZ1P01CWI';

var fourSqView = {

  loadFSData: function(placeId) {

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
      console.log('Foursquare returned the following:');
      console.log(data);

      var placeUrl = data.response.venue.canonicalUrl;
      var category = data.response.venue.categories[0].name;
      var rating = data.response.venue.rating;
      var msg = "Success";

      // update viewModel with foursquare data
      viewModel.updateFSData(placeUrl, msg);

    }).fail(function(e) {
      var placeUrl = "";
      var msg = "Foursquare search failed";
      viewModel.updateFSData(placeUrl, msg);
    });

    return false;
  }
};
