App.Controller = (function() {
    //Module
    var that = {},
    tagCloud = null,
    solrManager = null;



    //Variablen
    var searchText,
    selector,
    selected,
    clickedTag,

    init = function() {
        // Neue Module einbinden
        tagCloud = App.TagCloud.init();
        solrManager = App.SolrManager().init();
        $(".chzn-select").chosen();


        
 
        // --- MAIN PAGE ---

        //Listeners

        $( "#searchBarButton" ).click(function() {
            searchText = document.getElementById('searchBar').value;
            var query = formatQuery(searchText);
            selector = document.getElementById("selector");
            selected = selector.options[selector.selectedIndex].value;
            $( "#searchBarButton" ).trigger("search", [query]);
            solrManager.search(query);
            console.log("Gesucht nach: "+ query+ " mit selector: " +selected );
            $("#mostSearchedArea").hide();
            $("#recipeOfTheDayArea").hide();
            $("#filterArea").css("visibility", "visible");
            $("#mostSearchedArea2").css("visibility", "visible");
            $("#resultListArea").css("visibility", "visible");
        });

        $( "#searchBar" ).keypress(function( event ) {
            if ( event.which == 13 ) {
                event.preventDefault();
                $( "#searchBarButton" ).trigger("click");

        }
        });

        $( "#tagCloud").on( "tagClicked", function(event, tag) {
            clickedTag = tag;
            $("#searchBar").val(clickedTag);
            console.log(clickedTag);
        });

        //Methods


        var formatQuery = function(text){
            var result = text;
            result = result.replace(" ", "+");



            return result;
        }

    };


    that.init = init;

	return that;
})();