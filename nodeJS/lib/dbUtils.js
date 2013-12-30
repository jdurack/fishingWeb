(function() {
  var config, connection, db, dbUtils, logger, nodeMysql,
    _this = this;

  nodeMysql = require('node-mysql');

  config = require('../config');

  logger = require('./logger');

  db = new nodeMysql.DB({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
  });

  connection = null;

  dbUtils = module.exports = {
    connect: function(callback) {
      logger.log(['db connect running...']);
      return db.connect(function(conn, connectCallback) {
        connection = conn;
        conn.query('SELECT COUNT(*) FROM usgsData;', function(result, b, c) {});
        return connectCallback();
      }, callback);
    },
    query: function(query, callback) {
      return connection.query(query, function(dbError, results) {
        return callback(dbError, results);
      });
    }
  };

}).call(this);
