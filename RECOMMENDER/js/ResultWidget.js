(function ($) {
AjaxSolr.ResultWidget = AjaxSolr.AbstractWidget.extend({
	
	afterRequest: function () {

	  $(this.target).empty();
	  console.log("sers");
	  for (var i = 0, l = this.manager.response.response.docs.length; i < l; i++) {
	    var doc = this.manager.response.response.docs[i];
	    // $(this.target).append(this.template(doc));
	    console.log(doc);
	   // $("#resultListArea").append('<div class="resut"></div>');
	  }
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
})(jQuery);