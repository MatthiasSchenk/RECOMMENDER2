App.Controller = (function() {
    var that = {},
    tagCloud = null;

    init = function() {
        tagCloud = App.TagCloud.init();
    };

    that.init = init;

	return that;
})();