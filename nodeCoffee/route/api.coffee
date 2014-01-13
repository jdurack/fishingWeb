dateUtils = require 'date-utils'
logger = require '../lib/logger'
dbUtils = require '../lib/dbUtils'
config = require '../config'

apiRoute = module.exports =
  runQuery: (query, res, sendFirstElement) =>
    dbUtils.query query, (dbError, dbResults) =>
      if dbError
        logger.error dbError
        res.send 500
      else
        response = dbResults
        if sendFirstElement 
          if response.length > 0
            response = response[0]
          else
            response = {}
        res.send response

  usgsData: (req, res) =>
    locationId = req.query.locationId
    startDate = Date.today().addDays( -1 * config.defaultReportDays ).toYMD()
    query = 'SELECT paramId, localDateTime, value'
    query += ' FROM USGSData '
    query += ' WHERE locationId = "' + locationId + '"'
    query += ' AND localDateTime >= "' + startDate + '"'
    query += ' ORDER BY localDateTime '
    apiRoute.runQuery query, res

  precipitationData: (req, res) =>
    locationId = req.query.locationId
    startDate = Date.today().addDays( -1 * config.defaultReportDays ).toYMD()
    logger.log {date: startDate}
    query = 'SELECT date, precipitationInches'
    query += ' FROM WeatherDataDaily '
    query += ' WHERE locationId = "' + locationId + '"'
    query += ' AND date >= "' + startDate + '"'
    query += ' ORDER BY date '
    apiRoute.runQuery query, res

  location: (req, res) =>
    locationId = req.query.locationId
    query = 'SELECT *'
    query += ' FROM Location '
    query += ' WHERE locationId = "' + locationId + '"'
    apiRoute.runQuery query, res, true

  locations: (req, res) =>
    query = 'SELECT *'
    query += ' FROM Location '
    apiRoute.runQuery query, res