class Fishing_Helper_APIUtils

  globalData: {}

  locationsFetching: false
  locationsFetched: false
  locationsFetchedCallbacks: []

  fetchData: (endpoint, data, cb) =>
    url = '/api/' + endpoint
    data = data || {}
    $.ajax
        url: url
        data: data
        complete: (response, responseStatus) =>
          data = {}
          if responseStatus is 'success'
            try
              data = JSON.parse response.responseText
            catch e
              flError 'data parsing failed'
          else
            flError 'data fetch failed'
          cb data

  getLocation: (locationId, cb) =>
    if @locationsFetched
      location = @globalData.locations[locationId]
      cb location
    else
      if @locationsFetching
        @locationsFetchedCallbacks.push () =>
          @getLocation locationId, cb
      else
        @getLocations () =>
          @getLocation locationId, cb

  getLocations: (cb) =>
    if @locationsFetched
      cb @globalData.locations
    else
      @locationsFetching = true
      @locationsFetchedCallbacks.push cb
      @fetchData 'locations', {}, (responseData) =>
        @globalData.locations = responseData
        @locationsFetched = true
        @locationsFetching = false
        _.each @locationsFetchedCallbacks, (locationsFetchedCallback) =>
          locationsFetchedCallback @globalData.locations

Fishing.Helper.APIUtils = new Fishing_Helper_APIUtils()