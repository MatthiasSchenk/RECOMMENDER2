
App.Controller = (function() {
    //Module
    var that = {},
    tagCloud = null;

    //Variablen
    var searchText,
    selector,
    selected,
    clickedTag,

    init = function() {
        // Neue Module einbinden
        tagCloud = App.TagCloud.init();

 
        // --- MAIN PAGE ---

        //Listeners

        $( "#searchBarButton" ).click(function() {
            searchText = document.getElementById('searchBar').value;
            
            selector = document.getElementById("selector");
            selected = selector.options[selector.selectedIndex].value;

            console.log("Gesucht nach: "+ searchText+ " mit selector: " +selected );

        });

        $( "#searchBar" ).keypress(function( event ) {
            if ( event.which == 13 ) {
                event.preventDefault();
                $( "#searchBarButton" ).trigger("click");
        }
        });

        $( "#tagCloud").on( "tagClicked", function(event, tag) {
            clickedTag = tag;
            console.log(clickedTag);
        });

    };


    that.init = init;

	return that;
})();