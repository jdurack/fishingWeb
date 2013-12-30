class Fishing.View.Base extends Backbone.View

  subViews: []
  isGlobalView: false
  name: ''

  #over-writeable...
  preRender: =>
  postRender: =>
  getTemplateData: =>
    {}

  renderSubViews: =>
    console.log 'renderSubViews, count: ' + @subViews.length
    _.each @subViews, (subView) =>
      subView.render()

  getTemplateName: =>
    'bb/template/' +  @name + '.html'

  getTemplateSource: =>
    templateName = @getTemplateName()
    window["Fishing"]["Template"][templateName]

  renderTemplate: =>
    source = @getTemplateSource()
    html = source @getTemplateData()
    @$el.html html

  addSubView: (subView) =>
    @subViews.push subView

  set: (key, value) =>
    @[key] = value

  addSubViewByDefinition: (subViewDefinition, data) =>
    data = data || {}
    data.name = subViewDefinition.name
    subViewClassName = 'Fishing.View.' + Fishing.Util.capitalize( data.name )
    subViewClass = Fishing.Util.stringToFunction subViewClassName
    subView = new subViewClass()
    _.each data, (datumValue, datumKey) =>
      subView.set datumKey, datumValue
    selector = subViewDefinition.elSelector
    element = if @isGlobalView then $(selector) else @$(selector)
    #console.log 'selector: ' + selector + ', element: ' , element
    subView.setElement element
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