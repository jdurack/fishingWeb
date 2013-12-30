class Fishing.View.Report extends Fishing.View.Base
  
  postRender: =>
    @fetchLocationData()

  fetchLocationData: =>
    console.log 'fetching data for locationId: ' + @locationId