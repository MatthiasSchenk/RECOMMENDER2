
App.Controller = (function() {
    //Module
    var that = {},
    tagCloud = null;

    //Variablen
    var searchText;

    init = function() {
        // Neue Module einbinden
        tagCloud = App.TagCloud.init();

        // --- MAIN PAGE ---

        //Click Listener
        
        $( "#searchBarButton" ).click(function() {
            searchText = document.getElementById('searchBar').value;
            console.log("Gesucht nach: "searchText);
        });





    };

    that.init = init;

	return that;
})();