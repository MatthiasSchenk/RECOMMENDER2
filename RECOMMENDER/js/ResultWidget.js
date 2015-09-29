var counter = 0;

(function ($) {
AjaxSolr.ResultWidget = AjaxSolr.AbstractWidget.extend({


	
	afterRequest: function () {

	  $(this.target).empty();
	  for (var i = 0, l = this.manager.response.response.docs.length; i < l; i++) {
	  	counter++;
	    var doc = this.manager.response.response.docs[i];
	    //console.log(doc);

	    //DATA

	    var title = doc.title[0];
	    var rating = doc.userrating[0] / doc.numuserratings[0];
	    var duration = doc.recipetime[0];

	    var ingredients = doc.ingredientname;
	    var ingredient = "Zutaten: ";
	    var portionvalues = doc.portionvalue;
	    var portiontypes = doc.portiontype;

	    var instructions = doc.instructions[0];
	    // instructions.replace("<br />", " ");


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
	    	//instructions
	    if(instructions[0] != ""){
	    	var instructionString = "Anleitung: "+instructions;
	    }else{
	    	var instructionString = "leider keine Anleitung vorhanden";
	    }
	    
		

	    

	    	//ingredients
	    for(var j=0; j<ingredients.length; j++){

	    	ingredient = ingredient + " " + portionvalues[j] + " " + portiontypes[j] +" "+ ingredients[j] +"";

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
		//PORTIONVALUES
		var $portionvalues = $("<p>", {id: "recipePortionValues", class: "recipeListPortionValues", text: portionvalues});
		$($div2).append($portionvalues);
		//PORTIONTYPES
		var $portiontypes = $("<p>", {id: "recipePortionTypes", class: "recipeListPortionTypes", text: portiontypes});
		$($div2).append($portiontypes);
		//INSTRUCTIONS
		var $instructions = $("<p>", {id: "recipeInstructions", class: "recipeListInstructions scroll", text: instructionString});
		$($div2).append($instructions);

	  }
	  expandClickedRecipe();
	  console.log(counter + " Ergebnisse");
	},


});


	var expandClickedRecipe = function(){
		$(".recipeListIngredients").hide();
		$(".recipeListInstructions").hide();
	  	$(".expandRecipe").hide();

	  	$(".result").click(function(){
	  		$(this).next(".expandRecipe").slideToggle(600);
	  		$(this).next(".expandRecipe").children().toggle();
	  	})
	  }

	    	  
})(jQuery);