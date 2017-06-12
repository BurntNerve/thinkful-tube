TUBE_FORM = ".tubeForm";
TUBE_TEXT = "#tubeText";
ENDPOINT = "https://www.googleapis.com/youtube/v3/search";

HTML_TEMPLATE = (
    '<div class="image-container">' +
    '<a href="#" class="js-tube-link"><img class="js-tube-image glow" src="">' +
    '<p class="js-tube-description"></p></a>' +
    '</div>'
);

HTML_VIDEO_TEMPLATE = (
        '<iframe id="js-light-box" width="854" height="480" src="" frameborder="0" allowfullscreen></iframe>'
    );

    function handleThinkfulTube() {


        function getDataFromApi(searchTerm, callback) {

            var query = {
                part: 'snippet',
                key: "AIzaSyCWuykHinS2qyRuOUghAkAHWjz51OR-WNI",
                q: String(searchTerm),
                maxResults: "6"

            };

            $.getJSON(ENDPOINT, query, callback);
        }

        function renderResult(result) {
            var template = $(HTML_TEMPLATE);
            template.find(".js-tube-image").attr("src", result.snippet.thumbnails.medium.url);
            template.find(".js-tube-description").text(result.snippet.title);
            template.find(".js-tube-link").attr("href", "https://www.youtube.com/watch?v=" + result.id.videoId);
            return template;
        }

        function renderVideo() {
            var templateTwo = $(HTML_VIDEO_TEMPLATE);
            return templateTwo;
        }

        function displayYouTubeSearchData(data) {
            var results = data.items.map(function(item) {
                return renderResult(item);
            });

            $('#search-container').html(results).hide();
            $('#search-container').removeClass('dimmed');
            $('#search-container').fadeIn();
        }


        function handleSearchSubmit() {
            $(TUBE_FORM).submit(function(event) {
                event.preventDefault();
                console.log("handleSearchSubmit ran");
                var queryTarget = $(event.currentTarget).find(TUBE_TEXT);
                var query = queryTarget.val();
                $(queryTarget).val("");
                getDataFromApi(query, displayYouTubeSearchData);


            });
        }

        function handleVideoClick() {
            $("#search-container").on("click", "div", function() {
                $(".image-container").addClass("animated fadeOutLeft");
                var stringHref = String($(this).find("a").attr("href"));
                var callingId = stringHref.slice(32);
                var prefix = "https://www.youtube.com/embed/" + callingId;
                $('.image-container').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $('#search-container').html(renderVideo());
                    $('#search-container').addClass("dimmed");
                    $("#js-light-box").attr("src", prefix);
                });
                

            });
        }



        handleSearchSubmit();
        handleVideoClick();
    }


$(function() {
    handleThinkfulTube();
});
