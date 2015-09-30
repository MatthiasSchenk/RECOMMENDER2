App.TagCloud = (function() {

    var that = {},
	names = ["Nudelsalat", "Schokoladenkuchen", "Eierlikörkuchen", "Apfelkuchen", "Nusskuchen", "Mousse au chocolat", "Gefüllte Champignons", "Nudelauflauf", "Käsekuchen"],
	weights = [93,69,67,65,64,58,56,55,54],
	clickedTag,

    init = function() {

    	var ul = document.getElementById('tagCloud');
    	var ul2 = document.getElementById('tagCloud2');

   		fillCloud(1, names, weights);

   		document.body.addEventListener("updateCloud", function(e){ 

   			$("#tagCloud2").empty();
   			var n = [];
   			var w = [];

   			for (var i = 0; i < e.detail.length; i++) {
   				n[i] = e.detail[i].title;
   				w[i] = e.detail[i].num;
   				
   			};
   
   			fillCloud(2,n,w)
   		},true);

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

		function fillCloud(cloud, names, weights){
			for (var i = 0; i < names.length; i++) {
				if(cloud == 1){
					$("#tagCloud").append('<li id="tagCloudElement'+i+'" data-weight="'+weights[i]+'"><a href="#">'+names[i]+'</a></li>');
				}

				if(cloud == 2){
					if(names[i] != null){
						$("#tagCloud2").append('<li id="tagCloudElement'+i+'" data-weight="'+weights[i]+'"><a href="#">'+names[i]+'</a></li>');
					}

				}
			};
		}



	};

    that.init = init;


	return that;

})();