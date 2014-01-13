class Fishing.View.Report extends Fishing.View.Base
  
  location: null
  usgsData: null
  precipitationData: null

  getTemplateData: =>
    location: @location.attributes

  postInitialize: =>
    @location = new Fishing.Model.Location()
    @location.on 'change', @render
    @fetchLocationData()

  postRender: =>
    if @usgsData isnt null
      @drawUSGSDataCharts()
    if @precipitationData isnt null
      @drawPrecipitationDataChart()

  fetchLocationData: =>
    Fishing.Helper.APIUtils.fetchData 'location'
      , {locationId: @locationId}
      , (responseData) =>
        @location.set responseData

    Fishing.Helper.APIUtils.fetchData 'usgsData'
      , {locationId: @locationId}
      , (responseData) =>
        @usgsData = responseData
        @drawUSGSDataCharts()

    Fishing.Helper.APIUtils.fetchData 'precipitationData'
      , {locationId: @locationId}
      , (responseData) =>
        @precipitationData = responseData
        @drawPrecipitationDataChart()

  getChartTitle: =>
    'Stream flow'

  getUSGSFlowRateDataArray: =>
    @getUSGSDataArray Fishing.Constants.paramIds.flowRate

  getUSGSGageHeightDataArray: =>
    @getUSGSDataArray Fishing.Constants.paramIds.gageHeight

  getUSGSDataArray: (paramId) =>
    data = [
      ['Date/Time', 'Flow']
    ]
    _.each @usgsData, (datum) =>
      if datum.paramId is paramId
        datumForArray = [
          datum.localDateTime
          parseFloat datum.value
        ]
        data.push datumForArray
    data

  getPrecipitationDataArray: =>
    data = [
      ['Date', 'Precipitation (inches)']
    ]
    _.each @precipitationData, (datum) =>
      datumForArray = [
        datum.date
        parseFloat datum.precipitationInches
      ]
      data.push datumForArray
    data

  drawChart: (dataArray, title, elementId) =>
    if dataArray.length < 2
      flLog 'empty data for chart: ' + title
      return
    data = google.visualization.arrayToDataTable dataArray
    
    options =
      title: title
      curveType: 'function'
      legend:
        position: 'bottom'

    chartElement = document.getElementById elementId
    chart = new google.visualization.LineChart chartElement
    chart.draw data, options

  drawUSGSDataCharts: =>
    #@drawChart @getUSGSFlowRateDataArray(), 'Stream Flow', 'usgsFlowRateChart'
    @drawChart @getUSGSGageHeightDataArray(), 'Gage Height', 'usgsGageHeightChart'

  drawPrecipitationDataChart: =>
    @drawChart @getPrecipitationDataArray(), 'Precipitation', 'precipitationDataChart'