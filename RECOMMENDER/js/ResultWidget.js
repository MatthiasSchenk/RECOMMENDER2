var docArray = [];
var counter = 0;
var selectedTime = 1000;
var chosenArray = [];
var option1 = 0;
var option2 = 0;
var option3 = 0;
var option4 = 0;
var option5 = 0;
var option0 = 0;
var tagCloudData;

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
	    checkFilterOptions();
	    if(option0 == 1){
	    	docArray = filterOptionsAlc();
	    }
	    if(option1 == 1){
	    	docArray = filterOptionsGluten();
	    }
	    if(option2 == 1){
	    	docArray = filterOptionsLactose();
	    }
	    if(option3 == 1){
	    	docArray = filterOptionsVege();
	    }
	    if(option4 == 1){
	    	docArray = filterOptionsSport();
	    }
	    if(option5 == 1){
	    	docArray = filterOptionsSugar();
	    }
	 $("#range").on("input change", function() { 
	    docArray = sortTime();});

	 $("#range").on("change", function() { 
       
 		selectedTime = document.getElementById("range").value;
 		 console.log(selectedTime);
    });
	    
	  	counter++;

	    var doc = this.manager.response.response.docs[i];
	    //console.log(doc);


	    // ANZEIGE ----------------------------------------------------------


	 	for(var m = 0; m < docArray.length; m++){
	    var doc = docArray[m];
	    console.log(doc.diabetus);




	    //variablen
	    if(doc.title[0].length > 40){
	    	var title = doc.title[0].substring(0,37)+"...";
	    }else{
	   		var title = doc.title[0].substring(0,40);
	    }


	    var rating = doc.userrating[0] / 10;
	    var numuserratings = doc.numuserratings[0];

	    
	    //console.log("CHOSEN", $("recipientSelection").chosen());

	    var duration = doc.recipetime[0];

	    var ingredients = doc.ingredientname;
	    var ingredient = "Zutaten: <br>";
	    var portionvalues = doc.portionvalue;
	    var portiontypes = doc.portiontype;


	    var instructions = doc.instructions[0];
	    // instructions.replace("<br />", " ");



	    var antiAlk = (doc.antialc[0]);
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
	    if(antiAlk){
	    	var alcString = "Alkohol: Nein";
	    }else{
	    	var alcString = "Alkohol: Ja";
	    }
	    	//diabetus
	    if(diabetus){
	    	var diabetusString = "Diabetiker: Ja";
	    }else{
	    	var diabetusString = "Diabetiker: Nein";
	    }
	    	//lactose
	   	if(lactose){
	    	var lactoseString = "Laktose: Ja";
	    }else{
	    	var lactoseString = "Laktose: Nein";
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
		//var $portionvalues = $("<p>", {id: "recipePortionValues", class: "recipeListPortionValues", text: portionvalues});
		//$($div2).append($portionvalues);
		//PORTIONTYPES
		//var $portiontypes = $("<p>", {id: "recipePortionTypes", class: "recipeListPortionTypes", text: portiontypes});
		//$($div2).append($portiontypes);
		//INSTRUCTIONS
		var $instructions = $("<p>", {id: "recipeInstructions", class: "recipeListInstructions scroll", html: instructionString});
		
		$($div2).append($instructions);
	  }
	  expandClickedRecipe();
	  console.log(counter + " Ergebnisse");
	}
});
})(jQuery);


	var checkFilterOptions = function(){
		if(chosenArray.length == 0 ){
			console.log("Keine Filteroptionen angegeben");
		}else{
			for (var i = 0; i < chosenArray.length; i++) {
				var index = i+1;
				var chosen = index.toString();
				var selected = document.getElementById("option"+chosen).text;
			}
		}
	}


	var checkTime = function(){
		var temp = [];
		for(var o = 0; o < docArray.length; o++){
			if(docArray[o].recipetime[0] <= time){
				console.log(docArray[o].recipetime[0]);
				temp.push(docArray[o]);
			}
		}
	}

	var sortTime = function () {
		var result = [];
		for (var i = 0; i < docArray.length; i++) {
			if(docArray[i].recipetime[0] < selectedTime){
				result.push(docArray[i]);
			}
		};
		return result;
	}

	var createTagCloudData = function () {
		var numShownTags; 
		var allIngredients = [];
		var counters;
		var summedIngredients;

		if(docArray.length > 10){
			numShownTags = 10;
		}else{
			numShownTags = docArray.length;
		}
		
		for (var i = 0; i < docArray.length; i++) {
			for (var j = 0; j < docArray[i].ingredientname.length; j++) {
				allIngredients.push(docArray[i].ingredientname[j])
			};
		};
		console.log(allIngredients)

		for (var i = 0; i < allIngredients.length; i++) {
			
		};
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
        	var thisnumuser = parseInt(thisObject.numuserratings);
        	var thatnumuser = parseInt(thatObject.numuserratings);
        	if (thisnumuser < thatnumuser){
			return 1;
			}else if (thisnumuser > thatnumuser){
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
	  		$(this).next(".expandRecipe").children().slideToggle(600);
	  		
	  		updateTagCloud($(this).find(".recipeListTitle").text());
	  	});
	  }

	  var updateTagCloud = function  (recipeTitle) {
	  	var ingrList = [];

	  	for (var i = 0; i < docArray.length; i++) {
	  		if(docArray[i].title[0] == recipeTitle){
	  			ingrList = docArray[i].ingredientname;
	  		}
	  	}
	  	compareIngredientLists(ingrList, recipeTitle);
	  }

	  var compareIngredientLists = function  (list, recipeTitle) {
	  	var interestingRecipes = [];
	  		for (var i = 0; i < list.length; i++) {
	  			for (var j = 0; j < docArray.length; j++) {
	  					if(docArray[j].ingredientname.indexOf(list[i]) > -1){
	  						if(docArray[j].title[0] != recipeTitle){
	  							interestingRecipes.push(docArray[j].title[0])
	  						}
	  						
	  				}
	  			}
	  		}

	  		interestingRecipes.sort();

	  		var sortedInterestingRecipes = [];
	  		var sortedInterestingRecipesSimilarity = [];

	  		var current = null;
    		var cnt = 0;
		    for (var i = 0; i < interestingRecipes.length; i++) {
		        if (interestingRecipes[i] != current) {
		            if (cnt > 0) {
		            	sortedInterestingRecipes.push({title: current, num: cnt}); 
		            }
		            current = interestingRecipes[i];
		            cnt = 1;
		        } else {
		            cnt++;
		        }
		    }
		    if (cnt > 0) {
		        sortedInterestingRecipes.push(current);
		    }


			sortedInterestingRecipes.sort(function compare(a,b) {
				  if (a.num < b.num)
				    return 1;
				  if (a.num > b.num)
				    return -1;
				  return 0;
				});

			sortedInterestingRecipes = sortedInterestingRecipes.slice(0, 6);


			tagCloudData = sortedInterestingRecipes;

			var update = new CustomEvent("updateCloud", {"detail": sortedInterestingRecipes});
			document.body.dispatchEvent(update);

	  }

	  

	    	  

function changeHiddenInput (objDropDown){
		document.getElementById("hiddenInput").value = objDropDown.value;
		var currentValue = document.getElementById("hiddenInput").value;
		console.log("currentValue: ",currentValue);
		if(currentValue == ""){
			console.log("already in array");
			console.log(document.getElementById("option1").selected);

			if(option0 == 1 && document.getElementById("option0").selected == false){
				var index = chosenArray.indexOf("0");
				chosenArray.splice(index, 1);
				option0 = 0;
			}else if
			(option1 == 1 && document.getElementById("option1").selected == false){
				var index = chosenArray.indexOf("1");
				chosenArray.splice(index, 1);
				option1 = 0;
			}else if
			(option2 == 1 && document.getElementById("option2").selected == false){
				var index = chosenArray.indexOf("2");
				chosenArray.splice(index, 1);
				option2 = 0;
			}else if
			(option3 == 1 && document.getElementById("option3").selected == false){
				var index = chosenArray.indexOf("3");
				chosenArray.splice(index, 1);
				option3 = 0;
			}else if
			(option4 == 1 && document.getElementById("option4").selected == false){
				var index = chosenArray.indexOf("4");
				chosenArray.splice(index, 1);
				option4 = 0;
			}else if
			(option5 == 1 && document.getElementById("option5").selected == false){
				var index = chosenArray.indexOf("5");
				chosenArray.splice(index, 1);
				option5 = 0;
			}
			console.log(chosenArray);

		}else{
					if(currentValue == 0){
						option0 = 1;
						console.log("option0 = " + option0);
					}
					if (currentValue == 1){
						option1 = 1;
						console.log("option1 = " + option1);
					}
					if (currentValue == 2){
						option2 = 1;
						console.log("option2 = " + option2);
					}
					if (currentValue == 3){
						option3 = 1;
						console.log("option3 = " + option3);
					}
					if (currentValue == 4){
						option4 = 1;
						console.log("option4 = "+ option4);
					}
					if (currentValue == 5){
						option5 = 1;
						console.log("option5 = "+ option4);
					}
					chosenArray.push(currentValue);
					console.log(chosenArray);
			}
			document.getElementById("recipientSelection").value = null;
		}
		
		/*console.log("BEGINARRAY", chosenArray);
		var valuefound = false;
		var currentValue = document.getElementById("hiddenInput").value;
		for (var i = 0; i <= chosenArray.length; i++) {
			if(chosenArray[i] == currentValue){
				console.log("already in array");
				var index = chosenArray.indexOf(currentValue);
				chosenArray.splice(i, 1);
				valuefound = true;
			}
		};
		if(valuefound==false){
			currentValue = objDropDown.value;
			chosenArray.push(currentValue);
		}
		document.getElementById("recipientSelection").value = "";
		console.log("CHOSEN", chosenArray);*/
		
	

	function checkValueInArray(currentValue, arr){
		console.log("proof ", currentValue, " - ", arr);
		for (var i = 0; i < arr.length; i++) {
			if(currentValue == arr[i]){
				console.log("found ", currentValue, " - ", arr);
				return true;
			}
		};
		return false;
	}


	var filterOptionsAlc = function(){
		var arr = [];
		for (var i = 0; i < chosenArray.length; i++) {
			if(chosenArray[i] == 0){
				console.log("deleting alc recipes");
				for (var j = 0; j < docArray.length; j++) {
					if(docArray[j].antialc == "true"){
						arr.push(docArray[j]);
					}
				};
			}
		}
		return arr;
	}

	var filterOptionsGluten = function(){
		var arr = [];
		for (var i = 0; i < chosenArray.length; i++) {
			if(chosenArray[i] == 1){
				console.log("deleting gluten recipes");
				for (var j = 0; j < docArray.length; j++) {
					if(docArray[j].gluten == "false"){
						arr.push(docArray[j]);
					}
				};
			}
		}
		return arr;
	}

	var filterOptionsLactose = function(){
		var arr = [];
		for (var i = 0; i < chosenArray.length; i++) {
			if(chosenArray[i] == 2){
				console.log("deleting lactose recipes");
				for (var j = 0; j < docArray.length; j++) {
					if(docArray[j].lactose == "true"){
						arr.push(docArray[j]);
					}
				};
			}
		}
		return arr;
	}
	var filterOptionsVege = function(){
		var arr = [];
		for (var i = 0; i < chosenArray.length; i++) {
			if(chosenArray[i] == 3){
				console.log("deleting vege recipes");
				for (var j = 0; j < docArray.length; j++) {
					if(docArray[j].vegetarian == "true"){
						arr.push(docArray[j]);
					}
				};
			}
		}
		return arr;
	}

	var filterOptionsSport = function(){
		var arr = [];
		for (var i = 0; i < chosenArray.length; i++) {
			if(chosenArray[i] == 4){
				console.log("deleting sport recipes");
				for (var j = 0; j < docArray.length; j++) {
					if(docArray[j].sportsman == "true"){
						arr.push(docArray[j]);
					}
				};
			}
		}
		return arr;
	}

	var filterOptionsSugar = function(){
		var arr = [];
		for (var i = 0; i < chosenArray.length; i++) {
			if(chosenArray[i] == 5){
				console.log("deleting sugar recipes");
				for (var j = 0; j < docArray.length; j++) {
					if(docArray[j].diabetus == "true"){
						arr.push(docArray[j]);
					}
				};
			}
		}
		return arr;
	}
