async = require 'async'
logger = require './logger'
constants = require '../constants'
dbUtils = require './dbUtils'

appInitUtils = module.exports =
  init: (actions, callback) =>
    actionFunctions = []
    for action in actions
      switch action
        when constants.initAction.DB_CONNECT then actionFunctions.push dbUtils.connect

    async.parallel actionFunctions, (error) =>
      if error
        logger.error error
        exit 1
      logger.log ['app init complete']
      callback()