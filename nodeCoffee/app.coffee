express = require 'express'
routeAPI = require './route/api'
config = require './config'
constants = require './constants'
appInitUtils = require './lib/appInitUtils'
logger = require './lib/logger'

initActions = [
  constants.initAction.DB_CONNECT
]

init = () =>

  app = express()

  app.use logfmt.requestLogger()
  app.use express.static(__dirname + '/../public')

  app.get '/', (req, res) ->
    res.sendfile 'public/view/main.html'

  app.get '/api/reportData', (req, res) ->
    routeAPI.reportData req, res

  app.get '/api/location', (req, res) ->
    routeAPI.location req, res 

  listenPort = config.listenPort
  app.listen listenPort, () ->
    logger.log ['Listening on ' + listenPort]

appInitUtils.init initActions, init