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
    app.get('/pratt', function(req, res) {
      return res.sendfile('public/view/pratt.html');
    });
    app.get('/api/usgsData', function(req, res) {
      return routeAPI.usgsData(req, res);
    });
    app.get('/api/precipitationData', function(req, res) {
      return routeAPI.precipitationData(req, res);
    });
    app.get('/api/location', function(req, res) {
      return routeAPI.location(req, res);
    });
    app.get('/api/locations', function(req, res) {
      return routeAPI.locations(req, res);
    });
    listenPort = process.env.PORT || config.listenPort;
    return app.listen(listenPort, function() {
      return logger.log(['Listening on ' + listenPort]);
    });
  };

  appInitUtils.init(initActions, init);

}).call(this);
