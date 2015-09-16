App.TagCloud = (function() {
    var that = {},
	wordArray = ["Pizza", "Italienisch", "Spaghetti", "Scheinebraten", "Grillen", "Backen"];

    init = function() {

		$(document).ready(function(){
		    showMostSearchedWords();
		})

		function showMostSearchedWords(){
		    $("#tagCloud").tx3TagCloud({
		        multiplier: 2
		    });
		}
	};

    that.init = init;

	return that;
})();









