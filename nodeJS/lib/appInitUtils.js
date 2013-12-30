(function() {
  var appInitUtils, async, constants, dbUtils, logger,
    _this = this;

  async = require('async');

  logger = require('./logger');

  constants = require('../constants');

  dbUtils = require('./dbUtils');

  appInitUtils = module.exports = {
    init: function(actions, callback) {
      var action, actionFunctions, _i, _len;
      actionFunctions = [];
      for (_i = 0, _len = actions.length; _i < _len; _i++) {
        action = actions[_i];
        switch (action) {
          case constants.initAction.DB_CONNECT:
            actionFunctions.push(dbUtils.connect);
        }
      }
      return async.parallel(actionFunctions, function(error) {
        if (error) {
          logger.error(error);
          exit(1);
        }
        logger.log(['app init complete']);
        return callback();
      });
    }
  };

}).call(this);
