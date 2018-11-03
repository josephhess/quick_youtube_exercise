const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
      q: `${searchTerm}`,
      key: API_KEY,
      part: 'snippet'
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}


function renderResult(result) {
  return `
    <div>
      <a class="js-result-name" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="blank"><img src="${result.snippet.thumbnails.default.url}"/></a>
      <p><span class="js-watchers-count">${result.snippet.title} by ${result.snippet.channelTitle}</span></p>
    </div>
  `;
}

function displayYouTubeSearchData(data) {
  // data.items[0].snippet.thumbnails.default
  console.log(data.items[0]);
  const results = data.items.map((item, index) => {
   return renderResult(item);
  });
  // console.log(results);
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);
