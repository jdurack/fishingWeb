window.Fishing =
  Collection: {}
  Decorator: {}
  Model: {}
  Helper: {}
  Template: {}
  View: {}
  Global: {}

windowLoaded = false
googleChartsLoaded = false

initApp = () =>
  Fishing.Global.router = new Fishing.Router()
  Backbone.history.start()

$(window).load () =>
  windowLoaded = true
  if windowLoaded and googleChartsLoaded
    initApp()

google.load 'visualization', '1',
  packages: ['corechart']

google.setOnLoadCallback () =>
  googleChartsLoaded = true
  if windowLoaded and googleChartsLoaded
    initApp()