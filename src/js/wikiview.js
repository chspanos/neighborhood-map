// Wikipedia data view

var wikiView = {

  loadWikiData: function(placeName) {

    var $wikiElem = $('#wikipedia-links');
    $wikiElem.text("");

    // load wikipedia data
    var wikiRequestTimeout = setTimeout(function(){
      $wikiElem.text('Failed to retrieve Wikipedia data for this place');
    }, 8000);

    var wikiBaseUrl = 'http://en.wikipedia.org/w/api.php';

    $.ajax({
      url: wikiBaseUrl,
      data: {
        "action": "opensearch",
        "search": placeName,
        "format": "json"
      },
      dataType: "jsonp",
      jsonp: "callback"
    }).done(function(data) {
      // data found, so do something with it
      console.log('Wikipedia returned the following:');
      console.log(data);

      var titles = data[1];
      var urls = data[3];
      for (var i = 0; i < titles.length; i++) {
        // pull out data
        var title = titles[i];
        var url = urls[i];

        // format Wiki data and add to DOM
        $wikiElem.append('<li><a href="' + url + '">' + title + '</a></li>');
      }

      // Oops! Search returned an empty array but no error
      if (titles.length === 0) {
        $wikiElem.text('No matching Wikipedia entries found');
      }

      // turn off timeout
      clearTimeout(wikiRequestTimeout);

    }).fail(function(e) {
      $wikiElem.text('Wikipedia search failed');
    });

    return false;
  }
};
