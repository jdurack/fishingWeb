nodeMysql = require 'node-mysql'
config = require '../config'
logger = require './logger'

db = new nodeMysql.DB
  host: config.db.host
  user: config.db.user
  password: config.db.password
  database: config.db.database

connection = null

dbUtils = module.exports = 
  connect: (callback) =>
    logger.log ['db connect running...']
    db.connect (conn, connectCallback) =>
      connection = conn
      conn.query 'SELECT COUNT(*) FROM usgsData;', (result, b, c) =>
      connectCallback()
    , callback

  query: (query, callback) =>
    connection.query query, (dbError, results) =>
      callback dbError, results