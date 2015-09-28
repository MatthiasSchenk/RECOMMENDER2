(function ($) {
AjaxSolr.ResultWidget = AjaxSolr.AbstractWidget.extend({
	
	afterRequest: function () {

	  $(this.target).empty();
	  console.log("sers");
	  for (var i = 0, l = this.manager.response.response.docs.length; i < l; i++) {
	    var doc = this.manager.response.response.docs[i];
	    // $(this.target).append(this.template(doc));
	    console.log(doc);

	    //DATA

	    var title = doc.title[0];
	    var rating = doc.userrating[0] / doc.numuserratings[0];
	    var duration = doc.recipetime[0];
	    var ingredients = doc.ingredientname[0];
	    var alk = (!doc.antialc[0]);
	    var diabetus = doc.diabetus[0];
	    var lactose = doc.lactose[0];

	    console.log(""+alk+diabetus+lactose);

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
	    	//ingredients
	    if(ingredients != 0) {
	    	var ingredient = "Zutaten: "+ingredients;
	  	}else{
	  		var ingredient = "keine Zutaten notwendig.";
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

	  }
	  expandClickedRecipe();
	},



	/** template: function (doc) {
	  var snippet = '';
	  if (doc.text.length > 300) {
	    snippet += doc.dateline + ' ' + doc.text.substring(0, 300);
	    snippet += '<span style="display:none;">' + doc.text.substring(300);
	    snippet += '</span> <a href="#" class="more">more</a>';
	  }
	  else {
	    snippet += doc.dateline + ' ' + doc.text;
	  }

	  var output = '<div><h2>' + doc.title + '</h2>';
	  output += '<p id="links_' + doc.id + '" class="links"></p>';
	  output += '<p>' + snippet + '</p></div>';
	  return output;
	} */

});
	var expandClickedRecipe = function(){
		$(".recipeListIngredients").hide();
	  	$(".expandRecipe").hide();

	  	$(".result").click(function(){
	  		$(this).next(".expandRecipe").slideToggle(600);
	  		$(this).next(".expandRecipe").children().toggle();
	  	})
	  }
})(jQuery);