class Fishing.Router extends Backbone.Router

  mainLayout: null

  routes:
    '': 'default'
    'home': 'home'
    'report/:locationId': 'report'
    'sampleReport': 'sampleReport'

  default: () =>
    @renderPage 'home'
    
  report: (locationId) =>
    @renderPage 'report',
      locationId: locationId

  sampleReport: =>
    @renderPage 'sampleReport'

  setupMainLayout: =>
    if not @mainLayout
      @mainLayout = new Fishing.View.MainLayout
        name: 'mainLayout'
        elSelector: '#fishingApp'
    
  renderPage: (page, data) =>
    @setupMainLayout()
    @mainLayout.teardownSubViews()
    @mainLayout.addSubViewByDefinition
      name: page
      elSelector: '#fishingAppContent'
      , data
    @mainLayout.render()