App.SolrManager = function() {
    var that = {},
    Manager,

    init = function() {
      console.log("MANAGER ONLINE");

      return that;
    },

    search = function(query){
    (function ($) {

      $(function () {
        Manager = new AjaxSolr.Manager({
          solrUrl: "http://localhost:8983/solr/recommender/select?q="+query+"&rows=1000&wt=json&indent=true"
          //solrUrl: 'http://localhost:8983/solr/recommender/select?q=*%3A*&rows=100&wt=json&indent=true'
          //http://localhost:8983/solr/recommender/select?q=title%3Apizza+salami&wt=json&indent=true
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

    };

    that.init = init;
    that.search = search;

  return that;
};




