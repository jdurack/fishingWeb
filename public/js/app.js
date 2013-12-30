(function() {
  $(window).load(function() {
    return console.log('window loaded now');
  });

}).call(this);

(function() {
  var FishingRouter,
    _this = this;

  FishingRouter = Backbone.Router.extend({
    routes: {
      "help": "help",
      "search/:query": "search",
      "search/:query/p:page": "search"
    },
    help: function() {},
    search: function(query, page) {}
  });

}).call(this);
