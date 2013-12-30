(function() {
  var app, express, logfmt, port;

  express = require('express');

  logfmt = require('logfmt');

  app = express();

  app.use(logfmt.requestLogger());

  app.use(express["static"](__dirname + '/public'));

  app.get('/', function(req, res) {
    return res.sendfile('public/views/main.html');
  });

  port = process.env.PORT || 8080;

  app.listen(port, function() {
    return console.log('Listening on ' + port);
  });

}).call(this);