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
      var msg = "Success";

      var categories = "";
      var typesList = data.response.venue.categories;
      for (var i = 0; i < typesList.length; i++) {
        categories += typesList[i].name;
        if (i < (typesList.length - 1)) {
          categories += ", ";
        }
      }

      // update viewModel with foursquare data
      viewModel.updateFSData(index, placeUrl, categories, msg);

    }).fail(function(e) {
      var placeUrl = "";
      var categories = "";
      var msg = "Foursquare search failed";
      viewModel.updateFSData(index, placeUrl, categories, msg);
    });

    return false;
  }
};
