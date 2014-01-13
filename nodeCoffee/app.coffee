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

  app.get '/pratt', (req, res) ->
    res.sendfile 'public/view/pratt.html'

  app.get '/api/usgsData', (req, res) ->
    routeAPI.usgsData req, res

  app.get '/api/precipitationData', (req, res) ->
    routeAPI.precipitationData req, res

  app.get '/api/location', (req, res) ->
    routeAPI.location req, res

  app.get '/api/locations', (req, res) ->
    routeAPI.locations req, res

  listenPort = process.env.PORT || config.listenPort
  app.listen listenPort, () ->
    logger.log ['Listening on ' + listenPort]

appInitUtils.init initActions, init