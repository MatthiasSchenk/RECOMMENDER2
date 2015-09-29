App.TagCloud = (function() {
    var that = {},
	names = ["Tag", "Cloud", "mit", "Array", "is", "so", "EASY"],
	weights = [10,12,14,16,18,20,30],
	clickedTag,

    init = function() {

    	var ul = document.getElementById('tagCloud');

    	fillCloud(names, weights);


    	var ul2 = document.getElementById('tagCloud2');

    	//Click listener
    	function getEventTarget(e) {
			  e = e || window.event;
			    return e.target || e.srcElement; 
			}

			ul.onclick = function(event) {
			    clickedTag = getEventTarget(event).innerHTML;
			    $("#tagCloud").trigger( "tagClicked", [clickedTag] );
		};

			ul2.onclick = function(event) {
			    clickedTag = getEventTarget(event).innerHTML;
			    $("#tagCloud2").trigger( "tagClicked", [clickedTag] );
		};


		$(document).ready(function(){
		    showMostSearchedWords();
		});

		function showMostSearchedWords(){
		    $("#tagCloud").tx3TagCloud({
		        multiplier: 2

		    });

		    $("#tagCloud2").tx3TagCloud({
		    	multiplier: 2
		    });
		}

		function fillCloud(names, weights){
			for (var i = 0; i < names.length; i++) {
				$("#tagCloud").append('<li id="tagCloudElement'+i+'" data-weight="'+weights[i]+'"><a href="#">'+names[i]+'</a></li>');
			};


		}

		

	};

    that.init = init;


	return that;

})();