express = require 'express'
logfmt = require 'logfmt'

app = express()

console.log 'dirName: ' + __dirname

app.use logfmt.requestLogger()
app.use express.static(__dirname + '/../public')

app.get '/', (req, res) ->
  res.sendfile 'public/view/main.html'

port = process.env.PORT || 8080
app.listen port, () ->
  console.log 'Listening on ' + port