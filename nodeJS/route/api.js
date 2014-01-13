(function() {
  var apiRoute, config, dateUtils, dbUtils, logger,
    _this = this;

  dateUtils = require('date-utils');

  logger = require('../lib/logger');

  dbUtils = require('../lib/dbUtils');

  config = require('../config');

  apiRoute = module.exports = {
    runQuery: function(query, res, sendFirstElement) {
      return dbUtils.query(query, function(dbError, dbResults) {
        var response;
        if (dbError) {
          logger.error(dbError);
          return res.send(500);
        } else {
          response = dbResults;
          if (sendFirstElement) {
            if (response.length > 0) {
              response = response[0];
            } else {
              response = {};
            }
          }
          return res.send(response);
        }
      });
    },
    usgsData: function(req, res) {
      var locationId, query, startDate;
      locationId = req.query.locationId;
      startDate = Date.today().addDays(-1 * config.defaultReportDays).toYMD();
      query = 'SELECT paramId, localDateTime, value';
      query += ' FROM USGSData ';
      query += ' WHERE locationId = "' + locationId + '"';
      query += ' AND localDateTime >= "' + startDate + '"';
      query += ' ORDER BY localDateTime ';
      return apiRoute.runQuery(query, res);
    },
    precipitationData: function(req, res) {
      var locationId, query, startDate;
      locationId = req.query.locationId;
      startDate = Date.today().addDays(-1 * config.defaultReportDays).toYMD();
      logger.log({
        date: startDate
      });
      query = 'SELECT date, precipitationInches';
      query += ' FROM WeatherDataDaily ';
      query += ' WHERE locationId = "' + locationId + '"';
      query += ' AND date >= "' + startDate + '"';
      query += ' ORDER BY date ';
      return apiRoute.runQuery(query, res);
    },
    location: function(req, res) {
      var locationId, query;
      locationId = req.query.locationId;
      query = 'SELECT *';
      query += ' FROM Location ';
      query += ' WHERE locationId = "' + locationId + '"';
      return apiRoute.runQuery(query, res, true);
    },
    locations: function(req, res) {
      var query;
      query = 'SELECT *';
      query += ' FROM Location ';
      return apiRoute.runQuery(query, res);
    }
  };

}).call(this);
