var docArray = [];
var counter = 0;
var selectedTime = 1000;
(function ($) {
AjaxSolr.ResultWidget = AjaxSolr.AbstractWidget.extend({


	
	afterRequest: function () {

	// DATEN ------------------------------------------------------
	docArray = [];

	  $(this.target).empty();
	  for (var i = 0, l = this.manager.response.response.docs.length; i < l; i++) {
	    var dox = this.manager.response.response.docs[i];
	    docArray.push(dox);
	   	counter++;
	  }
	    docArray.sort(sortRecipes);
	    docArray = sortTime();

	 $("#range").on("change", function() { 
       
 		selectedTime = document.getElementById("range").value;
 		 console.log(selectedTime)
    });
	    
	  	counter++;

	    var doc = this.manager.response.response.docs[i];
	    //console.log(doc);


	    // ANZEIGE ----------------------------------------------------------
	 	for(var m = 0; m < docArray.length; m++){
	    var doc = docArray[m];
	    //DATA
	    if(doc.title[0].length > 40){
	    	var title = doc.title[0].substring(0,37)+"...";
	    }else{
	   		var title = doc.title[0].substring(0,40);
	    }


	    var rating = doc.userrating[0] / 10;
	    var numuserratings = doc.numuserratings[0];


	    var duration = doc.recipetime[0];

	    var ingredients = doc.ingredientname;
	    var ingredient = "Zutaten: <br>";
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
	    	var ratingString = "Rating: "+rating+" ("+numuserratings+" mal bew.)";
	    }else{
	    	var ratingString = "Rating: keine Angabe";
	    }
	    	//instructions
	    if(instructions[0] != ""){
	    	var instructionString = "Anleitung: <br>" +instructions;
	    }else{
	    	var instructionString = "leider keine Anleitung vorhanden";
	    }
	    
		

	    

	    	//ingredients
	    for(var j=0; j<ingredients.length; j++){

	    	ingredient = ingredient + " " + portionvalues[j] + " " + portiontypes[j] +" "+ ingredients[j] + "," +"<br>";

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
		var $ingredients = $("<p>", {id: "recipeIngredients", class: "recipeListIngredients scroll2", html: ingredient});
		$($div2).append($ingredients);
		//PORTIONVALUES
		var $portionvalues = $("<p>", {id: "recipePortionValues", class: "recipeListPortionValues", text: portionvalues});
		$($div2).append($portionvalues);
		//PORTIONTYPES
		var $portiontypes = $("<p>", {id: "recipePortionTypes", class: "recipeListPortionTypes", text: portiontypes});
		$($div2).append($portiontypes);
		//INSTRUCTIONS
		var $instructions = $("<p>", {id: "recipeInstructions", class: "recipeListInstructions scroll", html: instructionString});
		
		$($div2).append($instructions);
	  }
	  expandClickedRecipe();
	  console.log(counter + " Ergebnisse");
	},




});

	var sortTime = function () {
		var result = [];
		for (var i = 0; i < docArray.length; i++) {
			if(docArray[i].recipetime[0] < selectedTime){
				result.push(docArray[i]);
			}
		};
		return result;
	}

	var sortRecipes = function(thisObject, thatObject){
		var selector = document.getElementById("selector");
        var selected = selector.options[selector.selectedIndex].value;

	}

	var sortRecipes = function(thisObject, thatObject){
		var selector = document.getElementById("selector");
        var selected = selector.options[selector.selectedIndex].value;


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

        if(selected == "Meistbewertet"){
        	if (thisObject.numuserratings < thatObject.numuserratings){
			return 1;
			}else if (thisObject.numuserratings > thatObject.numuserratings){
				return -1;
			}
				return 0;
        	}
     }
	
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