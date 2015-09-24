(function ($) {
AjaxSolr.ResultWidget = AjaxSolr.AbstractWidget.extend({
	
	afterRequest: function () {

	  $(this.target).empty();
	  console.log("sers");
	  for (var i = 0, l = this.manager.response.response.docs.length; i < l; i++) {
	    var doc = this.manager.response.response.docs[i];
	    // $(this.target).append(this.template(doc));
	    console.log(doc);

	    var title = doc.title[0];

	  	var $div = $("<div></div>", {id: "foo", class: "result"});
		$("#resultListArea").append($div);
		//TITEL
	  	var $title = $("<p>", {id: "recipeTitle", class: "recipeListTitle", text: title});
		$($div).append($title);

		//EXPANDED DIV
		var $div2 = $('<div>', {class: "expandRecipe", value: "REZEPT"});
		$("#resultListArea").append($div2);

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
	  	$(".expandRecipe").hide();
	  	$(".result").click(function(){
	  		$(this).next(".expandRecipe").slideToggle(600);
	  	})
	  }
})(jQuery);