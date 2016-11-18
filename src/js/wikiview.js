// Wikipedia data view

var wikiView = {

  loadWikiData: function(placeName, index) {

    // load wikipedia data
    var wikiBaseUrl = 'https://en.wikipedia.org/w/api.php';

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
