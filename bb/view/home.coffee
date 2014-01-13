class Fishing.View.Home extends Fishing.View.Base

  googleMap: null

  getTemplateData: =>
    appName: Fishing.Constants.appName

  postRender: =>
    @drawMap()

  drawMap: =>
    mapCenter = Fishing.Constants.homeMap.center
    options =
      center: new google.maps.LatLng mapCenter.latitude, mapCenter.longitude
      zoom: Fishing.Constants.homeMap.zoomLevel
    element = document.getElementById('homeMap')
    @googleMap = new google.maps.Map element, options

    Fishing.Helper.APIUtils.getLocations (locations) =>
      _.each locations, (location) =>
        latLng = new google.maps.LatLng location.latitude, location.longitude
        marker = new google.maps.Marker
          position: latLng
          map: @googleMap
        google.maps.event.addListener marker, 'click', () ->
          Fishing.Global.router.navigate 'report/' + location.locationId,
            trigger: true
