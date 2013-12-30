FishingRouter = Backbone.Router.extend
  routes:
    "help":                 "help"
    "search/:query":        "search"
    "search/:query/p:page": "search"

  help: () =>
    
  search: (query, page) =>
    