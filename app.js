var express = require('express'),
    http = require('http');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('view engine', 'jade');
  app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
  app.use(express.logger('dev'));
});

app.configure('production', function(){
  app.use(express.errorHandler());
  app.use(express.logger());
});

app.get('/', function(req, res) {
  if (req.query["q"]) {
    query = req.query["q"];
    if (query.match(/![A-Za-z0-9]+/)) {
      console.log('Queried DuckDuckGo');
      res.redirect('https://duckduckgo.com?q=' + query);
    } else {
      console.log('Queried Google');
      if (req.query['google']) {
        res.redirect('https://' + req.query['google'] + '/search?q=' + query);
      } else {
        res.redirect('https://encrypted.google.com/search?q=' + query);
      }
    }
  }
  res.render('index');
});

app.get('/browser', function(req, res) {
  res.render('browser');
});

app.get('/privacy', function(req, res) {
  res.render('privacy');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
