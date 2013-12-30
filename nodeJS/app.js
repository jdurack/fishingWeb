(function() {
  var appInitUtils, config, constants, express, init, initActions, logger, routeAPI,
    _this = this;

  express = require('express');

  routeAPI = require('./route/api');

  config = require('./config');

  constants = require('./constants');

  appInitUtils = require('./lib/appInitUtils');

  logger = require('./lib/logger');

  initActions = [constants.initAction.DB_CONNECT];

  init = function() {
    var app, listenPort;
    app = express();
    app.use(logfmt.requestLogger());
    app.use(express["static"](__dirname + '/../public'));
    app.get('/', function(req, res) {
      return res.sendfile('public/view/main.html');
    });
    app.get('/api/reportData', function(req, res) {
      return routeAPI.reportData(req, res);
    });
    app.get('/api/location', function(req, res) {
      return routeAPI.location(req, res);
    });
    listenPort = config.listenPort;
    return app.listen(listenPort, function() {
      return logger.log(['Listening on ' + listenPort]);
    });
  };

  appInitUtils.init(initActions, init);

}).call(this);
