App.TagCloud = (function() {
    var that = {},
	wordArray = ["Pizza", "Italienisch", "Spaghetti", "Scheinebraten", "Grillen", "Backen"],
	clickedTag,

    init = function() {

    	var ul = document.getElementById('tagCloud');

    	//Click listener
    	function getEventTarget(e) {
			  e = e || window.event;
			    return e.target || e.srcElement; 
			}

			ul.onclick = function(event) {
			    clickedTag = getEventTarget(event).innerHTML;
			    $("#tagCloud").trigger( "tagClicked", [clickedTag] );

		};



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









