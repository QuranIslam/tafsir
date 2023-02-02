function doSearch() {
  // Retrieve the search query from the search field element
  const query = trim(document.getElementById("search_fld").value);

  // Check if the search query is less than 2 characters in length
  if (query.length < 2) {
    alert(_lang['search_err_length']);
    return;
  }

  // Retrieve the data from the local JSON file using the XMLHttpRequest object
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "quran.json", true);
  xhr.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      const data = JSON.parse(this.responseText);

      // Use the filter method to search for the query within the data
      const results = data.filter(item => item.text.includes(query) || item.nass_safy.includes(query));

      // Check if there are any search results
      if (results.length === 0) {
        // If there are no search results, display a message to the user
        var nass = '<div class="result_header">' + _lang['search_nores'] + '</div>';
      } else {
        // If there are search results, construct an HTML string containing the results
        var nass =
          '<div class="result_header">' +
          _lang['search_resof'] +
          ' " ' +
          query +
          ' " (' +
          results.length +
          ") </div>";
        var cls = "result_item";
        var n = 1;
        for (const result of results) {
          cls = n++ % 2 === 0 ? "result_item even" : "result_item";
          nass +=
            '<div class="' +
            cls +
            '"> <a href="#aya=' +
            result.sura +
            "_" +
            result.aya +
            '" onclick="search_gotoAya(' +
            result.sura +
            "," +
            result.aya +
            ');return false;" >' +
            getSuraName(result.sura) +
            " - " +
            _lang["aya"] +
            " " +
            result.aya +
            "</a>" +
            result.text +
            "</div>";
        }
      }

      // Add a new tab to the tabs manager object with the search results HTML
      tabsMan.addTab(_lang["search_key"] + " (" + results.length + ")", nass);
    }
  };
  xhr.send();
}