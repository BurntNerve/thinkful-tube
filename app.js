TUBE_FORM = ".tubeForm";
TUBE_TEXT = "#tubeText";
ENDPOINT = "https://www.googleapis.com/youtube/v3/search"

HTML_TEMPLATE = (
    '<div class="image-container">' +
    '<img class="js-tube-image" src="">' +
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
        template.find("js-tube-image").css("src", result.snippet.thumbnails.default.url)
        console.log(result.snippet.thumbnails.default.url)
        return template;
    }

    function displayYouTubeSearchData(data) {
        var results = data.items.map(function(item, index) {
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
