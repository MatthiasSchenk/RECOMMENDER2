var docArray = [];
(function ($) {
AjaxSolr.ResultWidget = AjaxSolr.AbstractWidget.extend({
	
	afterRequest: function () {

	  $(this.target).empty();
	  console.log("sers");
	  for (var i = 0, l = this.manager.response.response.docs.length; i < l; i++) {
	    var dox = this.manager.response.response.docs[i];
	    docArray.push(dox);
	  }
	    docArray.sort(sortRecipes);

	 	for(var m = 0; m < this.manager.response.response.docs.length; m++){
	    var doc = docArray[m];
	    //DATA

	    var title = doc.title[0];
	    var rating = doc.userrating[0];
	    var duration = doc.recipetime[0];

	    var ingredients = doc.ingredientname;
	    var ingredient = "Zutaten: ";
	    var portionvalues = doc.portionvalue;
	    var portiontypes = doc.portiontype;

	    var alk = (!doc.antialc[0]);
	    var diabetus = doc.diabetus[0];
	    var lactose = doc.lactose[0];


	    //STRINGS
	    	//duration
	    if(duration != 0){
	    	var durationString = "Dauer: "+duration+" min.";
	    }else{
	    	var durationString = "Dauer: keine Angabe";
	    }
	    	//rating
	   	if(rating > 0){
	    	var ratingString = "Rating: "+rating;
	    }else{
	    	var ratingString = "Rating: keine Angabe";
	    }

	    


	    for(var j=0; j<ingredients.length; j++){

	    	ingredient = ingredient + " " + portionvalues[j] + " " + portiontypes[j] +" "+ ingredients[j]+", \r\n";

	    }

	


	    
	    	//alk
	    if(alk){
	    	var alcString = "Alkohol: Ja"
	    }else{
	    	var alcString = "Alkohol: Nein"
	    }
	    	//diabetus
	    if(diabetus){
	    	var diabetusString = "Diabetiker: Ja"
	    }else{
	    	var diabetusString = "Diabetiker: Nein"
	    }
	    	//lactose
	   	if(lactose){
	    	var lactoseString = "Laktose: Ja"
	    }else{
	    	var lactoseString = "Laktose: Nein"
	    }



	    //HTML ELEMENTS

	  	var $div = $("<div></div>", {id: "foo", class: "result"});
		$("#resultListArea").append($div);
		//TITEL
	  	var $title = $("<p>", {id: "recipeTitle", class: "recipeListTitle", text: title});
		$($div).append($title);
		//DAUER
		var $duration = $("<p>", {id: "recipeDuration", class: "recipeListDuration", text: durationString});
		$($div).append($duration);
		//RATING
		var $rating = $("<p>", {id: "recipeRating", class: "recipeListRating", text: ratingString});
		$($div).append($rating);
		//ALKOHOL
		var $alk = $("<p>", {id: "recipeAlc", class: "recipeListAlc", text: alcString});
		$($div).append($alk);
		//DIABETIKER
		var $diabetus = $("<p>", {id: "recipeDiabetus", class: "recipeListDiabetus", text: diabetusString});
		$($div).append($diabetus);
		//LAKTOSE
		var $lactose = $("<p>", {id: "recipeLactose", class: "recipeListLactose", text: lactoseString});
		$($div).append($lactose);
		
		//EXPANDED DIV
		var $div2 = $('<div>', {class: "expandRecipe", value: "REZEPT"});
		$("#resultListArea").append($div2);
		//ZUTATEN
		var $ingredients = $("<p>", {id: "recipeIngredients", class: "recipeListIngredients", text: ingredient});
		$($div2).append($ingredients);
		
		var $portionvalues = $("<p>", {id: "recipePortionValues", class: "recipeListPortionValues", text: portionvalues});
		$($div2).append($portionvalues);
		var $portiontypes = $("<p>", {id: "recipePortionTypes", class: "recipeListPortionTypes", text: portiontypes});
		$($div2).append($portiontypes);

	  }
	  expandClickedRecipe();
	},





});

	var sortRecipes = function(thisObject, thatObject){
		var selector = document.getElementById("selector");
        var selected = selector.options[selector.selectedIndex].value;
        console.log("SORTIERLISTE", selected);
        console.log("RATING", docArray[0].userrating);

        if(selected == "Bewertung - absteigend"){
        	if (thisObject.userrating < thatObject.userrating){
			return 1;
			}else if (thisObject.userrating > thatObject.userrating){
				return -1;
			}
				return 0;
        }

        if(selected == "Bewertung - aufsteigend"){
        	if (thisObject.userrating > thatObject.userrating){
			return 1;
			}else if (thisObject.userrating < thatObject.userrating){
				return -1;
			}
				return 0;
        }

        if(selected == "Dauer - absteigend"){
        	if (thisObject.recipetime < thatObject.recipetime){
			return 1;
			}else if (thisObject.recipetime > thatObject.recipetime){
				return -1;
			}
				return 0;
        }

        if(selected == "Dauer - aufsteigend"){
        	if (thisObject.recipetime > thatObject.recipetime){
			return 1;
			}else if (thisObject.recipetime < thatObject.recipetime){
				return -1;
			}
				return 0;
        }
        }
	

	var expandClickedRecipe = function(){
		$(".recipeListIngredients").hide();
	  	$(".expandRecipe").hide();

	  	$(".result").click(function(){
	  		$(this).next(".expandRecipe").slideToggle(600);
	  		$(this).next(".expandRecipe").children().toggle();
	  	})
	  }
})(jQuery);