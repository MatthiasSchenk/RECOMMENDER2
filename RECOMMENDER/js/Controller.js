App.Controller = (function() {
    //Module
    var that = {},
    tagCloud = null,
    solrManager = null;
    var onResultPage = false;



    //Variablen
    var searchnormalized,
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
            
            onResultPage = true;

            if(onResultPage){
                $( ".result" ).remove();
            }

            searchnormalized = document.getElementById('searchBar').value;
            var query = formatQuery(searchnormalized);
            selector = document.getElementById("selector");
            selected = selector.options[selector.selectedIndex].value;
            $( "#searchBarButton" ).trigger("search", [query]);
            solrManager.search(query);
            console.log("Gesucht nach: "+ searchnormalized+ " mit selector: " +selected );
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

        $( "#tagCloud2").on( "tagClicked", function(event, tag) {
            clickedTag = tag;
            $("#searchBar").val(clickedTag);
            console.log(clickedTag);
        });


        $( "#logoArea").click(function() {
            onResultPage = false;
        });

        /*
        $("#recipientSelection").chosen().change(function(e, params){
             console.log(params.selected)
        });
        */


        //Methods


        var formatQuery = function(text){
            var normalized = text;
            var result = "";
            var searchedWordsArray;
            normalized = normalized.replace(',',' ');
            normalized = normalized.replace('/',' ');
            normalized = normalized.replace('&',' ');
            normalized = normalized.replace(' mit ',' ');
            normalized = normalized.replace(' und ',' ');
            normalized = normalized.replace(' oder ',' ');
            normalized = normalized.replace('  ',' ');

            searchedWordsArray = normalized.split(" ");




            //TITLE MATCH
            // a) exact match
            result += "title%3A+%22"
            for (var i = 0; i < searchedWordsArray.length; i++) {
                result += searchedWordsArray[i]; 
                if(i + 1 != searchedWordsArray.length){
                    result += "+";
                }        
            };
            result += "%22%5E"+searchedWordsArray.length;
            // b) match by words
            for (var i = 0; i < searchedWordsArray.length; i++) {
                    result += "+OR+title%3A+%22"+searchedWordsArray[i]+"%22%5E"+(searchedWordsArray.length-i)
            };

            //INGREDIENT MATCH
            for (var i = 0; i < searchedWordsArray.length; i++) {
                    result += "+OR+ingredientname%3A+%22"+searchedWordsArray[i]+"%22"
            };
            return result;
        }

    };


    that.init = init;

    return that;
})();