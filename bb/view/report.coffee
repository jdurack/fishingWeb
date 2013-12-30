class Fishing.View.Report extends Fishing.View.Base
  
  location: null
  reportData: null

  postInitialize: =>
    location = new Fishing.Model.Location()

  postRender: =>
    @fetchLocationData()

  fetchLocationData: =>
    console.log 'fetching data for locationId: ' + @locationId
    $.ajax
      url: '/api/reportData'
      data:
        locationId: @locationId
      success: (response) =>
        console.log 'success, response: ', response

    $.ajax
      url: '/api/location'
      data:
        locationId: @locationId
      success: (response) =>
        location.set response