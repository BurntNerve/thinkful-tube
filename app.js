TUBE_FORM = ".tubeForm";
TUBE_TEXT = "#tubeText";
ENDPOINT = "https://www.googleapis.com/youtube/v3/search"

HTML_TEMPLATE = (
    '<div class="image-container">' +
        '<a href="#" class="js-tube-link"><img class="js-tube-image glow" src="">' +
        '<p class="js-tube-description"></p></a>' +
    '</div>'
);

function handleThinkfulTube() {


    function getDataFromApi(searchTerm, callback) {

        var query = {
            part: 'snippet',
            key: "AIzaSyCWuykHinS2qyRuOUghAkAHWjz51OR-WNI",
            q: String(searchTerm),
            maxResults: "6"

        }

        $.getJSON(ENDPOINT, query, callback);
    }

    function renderResult(result) {
        var template = $(HTML_TEMPLATE);
        var counter = 0;
        template.find(".js-tube-image").attr("src", result.snippet.thumbnails.medium.url)
        template.find(".js-tube-description").text(result.snippet.title)
        template.find(".js-tube-link").attr("href", "https://www.youtube.com/watch?v=" + result.id.videoId)
        console.log(result.snippet.thumbnails.default.url)
        counter++;
        return template;
    }

    function displayYouTubeSearchData(data) {
        var results = data.items.map(function(item) {
            return renderResult(item);
        });

        $('#search-container').html(results);
    }


    function handleSearchSubmit() {
        $(TUBE_FORM).submit(function(event) {
            event.preventDefault();
            console.log("handleSearchSubmit ran");
            var queryTarget = $(event.currentTarget).find(TUBE_TEXT);
            var query = queryTarget.val();
            $(queryTarget).val("");
            getDataFromApi(query, displayYouTubeSearchData)


        })
    }



    handleSearchSubmit();
}


$(function() {
    handleThinkfulTube();
})
