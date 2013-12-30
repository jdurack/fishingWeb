(function() {
  var apiRoute, dbUtils, logger,
    _this = this;

  logger = require('../lib/logger');

  dbUtils = require('../lib/dbUtils');

  apiRoute = module.exports = {
    runQuery: function(query, res) {
      return dbUtils.query(query, function(dbError, dbResults) {
        if (dbError) {
          logger.error(dbError);
          return res.send(500);
        } else {
          return res.send(dbResults);
        }
      });
    },
    reportData: function(req, res) {
      var locationId, query;
      locationId = req.query.locationId;
      query = 'SELECT paramId, localDateTime, value';
      query += ' FROM USGSData ';
      query += ' WHERE locationId = "' + locationId + '"';
      return apiRoute.runQuery(query, res);
    },
    location: function(req, res) {
      var locationId, query;
      locationId = req.query.locationId;
      query = 'SELECT *';
      query += ' FROM Location ';
      query += ' WHERE locationId = "' + locationId + '"';
      return apiRoute.runQuery(query, res);
    }
  };

}).call(this);
