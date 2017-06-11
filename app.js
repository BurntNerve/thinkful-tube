TUBE_FORM = ".tubeForm";
TUBE_TEXT = "#tubeText";
ENDPOINT = "https://www.googleapis.com/youtube/v3/search"

HTML_TEMPLATE = (
    '<div style="border= 1px solid grey, height= 240px, width=320px;">' +
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
        template.find("js-tube-image").attr("src", items.snippet.thumbnails.medium.url)
        return template;
    }

    function displayYouTubeSearchData(data) {
        var results = data.items.map(fuction(item, index) {
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
