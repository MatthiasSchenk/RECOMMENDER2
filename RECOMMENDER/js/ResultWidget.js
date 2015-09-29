var docArray = [];
var sortedDocArray = [];
(function ($) {
AjaxSolr.ResultWidget = AjaxSolr.AbstractWidget.extend({
	
	afterRequest: function () {

	  $(this.target).empty();
	  console.log("sers");
	  for (var i = 0, l = this.manager.response.response.docs.length; i < l; i++) {
	    var dox = this.manager.response.response.docs[i];
	    docArray.push(dox);
	  }
	    //sortRecipes(doc);

	 	for(var j = 0; j = docArray.length; j++){
	 	console.log(docArray.length);
	    var doc = docArray[j];
	    //DATA

	    var title = doc.title[0];
	    var rating = doc.userrating[0];
	    var duration = doc.recipetime[0];

	    var ingredients = doc.ingredientname;
	    var ingredient = "Zutaten: ";
	    var portionvalues = doc.portionvalue;
	    var portiontypes = doc.portiontype;
	    console.log(ingredients);
	    console.log(portionvalues);	

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
	    console.log(ingredient);

	


	    
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

	var sortRecipes = function(){
		var selector = document.getElementById("selector");
        var selected = selector.options[selector.selectedIndex].value;
        console.log("SORTIERLISTE", selected);
        console.log("RATING", docArray[0].userrating);

        if(sortedDocArray.length == 0){
        	sortedDocArray[0] = docArray[0];
        }else{
        	for(i = 1; i < sortedDocArray.length; i++){
        		for(j = 0; j < docArray.length; j++){
        			var current = docArray[j].userrating;
        			var fix = sortedDocArray[i].userrating;
        			if(current > fix){
        				sortedDocArray.splice[j, 0, docArray[i]];
        				break;
        			}
        		}
        		sortedDocArray.push(docArray[i]);
        	}
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