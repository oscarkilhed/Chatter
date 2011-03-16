
/**
 * Module dependencies.
 */

var express = require('express');
var controllers = require('./controllers/controllers.js');
var home = controllers.home;
var chat = controllers.chat;

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyDecoder());
  app.use(express.methodOverride());
  app.use(express.cookieDecoder());
  app.use(express.session({ secret: 'chwa48tyaw9ACwkqskd58mhbolsA3asdasJFDr3aIS8udfsd9' }));
  app.use(app.router);
  app.use(express.staticProvider(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', home.index);

app.get('/:room', chat.room);

app.get('/:room/chat', chat.get);

app.post('/:room/chat', chat.post);

app.post('/logOn', home.logOn);

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port)
}
