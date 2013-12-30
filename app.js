var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendfile('public/views/main.html');
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});