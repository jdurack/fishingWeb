window.Fishing =
  Collection: {}
  Decorator: {}
  Model: {}
  Template: {}
  View: {}

$(window).load () ->
  router = new Fishing.Router()
  Backbone.history.start()