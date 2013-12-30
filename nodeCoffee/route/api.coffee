logger = require '../lib/logger'
dbUtils = require '../lib/dbUtils'

apiRoute = module.exports =
  runQuery: (query, res) =>
    dbUtils.query query, (dbError, dbResults) =>
      if dbError
        logger.error dbError
        res.send 500
      else
        res.send dbResults

  reportData: (req, res) =>
    locationId = req.query.locationId
    query = 'SELECT paramId, localDateTime, value'
    query += ' FROM USGSData '
    query += ' WHERE locationId = "' + locationId + '"'
    apiRoute.runQuery query, res

  location: (req, res) =>
    locationId = req.query.locationId
    query = 'SELECT *'
    query += ' FROM Location '
    query += ' WHERE locationId = "' + locationId + '"'
    apiRoute.runQuery query, res