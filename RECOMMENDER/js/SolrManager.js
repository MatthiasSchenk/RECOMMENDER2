var Manager;

(function ($) {

  $(function () {
    Manager = new AjaxSolr.Manager({
      solrUrl: 'http://reuters-demo.tree.ewdev.ca:9090/reuters/'
    });
    Manager.init();
    Manager.store.addByValue('q', '*:*');
    Manager.doRequest();

    Manager.addWidget(new AjaxSolr.ResultWidget({
  		id: 'result',
  		target: '#docs'
	}));
  });

})(jQuery);