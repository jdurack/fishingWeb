class Fishing.View.Base extends Backbone.View

  subViews: []
  isGlobalView: false
  name: ''

  #over-writeable...
  preInitialize: =>
  postInitialize: =>
  preRender: =>
  postRender: =>
  getTemplateData: =>
    {}

  initialize: (data) =>
    @preInitialize()
    _.each data, (datumValue, datumKey) =>
      @set datumKey, datumValue
    element = $ @elSelector
    @setElement element
    @postInitialize()

  renderSubViews: =>
    _.each @subViews, (subView) =>
      subView.render()

  getTemplateName: =>
    'bb/template/' +  @name + '.html'

  getTemplateSource: =>
    templateName = @getTemplateName()
    window["Fishing"]["Template"][templateName]

  renderTemplate: =>
    source = @getTemplateSource()
    data = @getTemplateData()
    html = source data
    element = $ @elSelector
    @setElement element
    @$el.html html

  addSubView: (subView) =>
    @subViews.push subView

  set: (key, value) =>
    @[key] = value

  addSubViewByDefinition: (subViewDefinition, data) =>
    data = data || {}
    data.name = subViewDefinition.name
    data.elSelector = subViewDefinition.elSelector
    subViewClassName = 'Fishing.View.' + Fishing.Helper.Utils.capitalize( data.name )
    subViewClass = Fishing.Helper.Utils.stringToFunction subViewClassName
    subView = new subViewClass data
    @addSubView subView

  render: =>
    @preRender()
    @renderTemplate()
    @renderSubViews()
    @postRender()

  teardownSubViews: =>
    _.each @subViews, (subView) =>
      subView._teardown()
    @subViews = []

  _teardown: =>
    @$el.html ''
    @$el.remove()