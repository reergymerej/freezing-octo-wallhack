
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var item = require('./routes/item');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express['static'](path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/items', item.index);
app.get('/items/:id', item.view);
app.put('/items/:id', item.update);
app['delete']('/items/:id', item['delete']);
app.get('/new-item', item['new']);
app.post('/new-item', item.create);

// Use middleware for the 404, not get.
app.use(function (req, res, next) {
	console.log('not found', req.url);
	res.status(404);
	res.render('404');
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
