class Fishing.Router extends Backbone.Router

  mainLayout: null

  routes:
    '': 'default'
    'report/:locationId': 'report'

  default: () =>
    @renderPage 'home'
    
  report: (locationId) =>
    @renderPage 'report',
      locationId: locationId

  setupMainLayout: =>
    if not @mainLayout
      @mainLayout = new Fishing.View.MainLayout
        el: $('#fishingApp')
      @mainLayout.name = 'mainLayout'
    
  renderPage: (page, data) =>
    @setupMainLayout()
    @mainLayout.teardownSubViews()
    @mainLayout.addSubViewByDefinition
      name: page
      elSelector: '#fishingAppContent'
      , data
    @mainLayout.render()