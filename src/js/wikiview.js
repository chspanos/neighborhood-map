// Wikipedia data view

var wikiView = {

  loadWikiData: function(placeName) {

    // load wikipedia data
    var wikiRequestTimeout = setTimeout(function(){
      viewModel.updateWikiData('', '', 'Failed to retrieve Wikipedia data for this place');
    }, 8000);

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
      console.log('Wikipedia returned the following:');
      console.log(data);

      var titles = data[1];
      var urls = data[3];
      if (titles.length > 0) {
        // pull out data
        var title = titles[0];
        var url = urls[0];
        // update place with first match
        viewModel.updateWikiData(url, title, '');
      } else {
        // Oops! Search returned an empty array but no error
        viewModel.updateWikiData('', '', 'No matching Wikipedia entries found');
      }

      // turn off timeout
      clearTimeout(wikiRequestTimeout);

    }).fail(function(e) {
      viewModel.updateWikiData('', '', 'Wikipedia search failed');
    });

    return false;
  }
};
