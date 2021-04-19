var express = require ('express');
var exphbs = require ('express-handlebars');
var path = require ('path');
var favicon = require ('serve-favicon');
var bodyParser = require ('body-parser');

/*
 * The server application.
 */
var app = express();
app.use (favicon (path.join (__dirname, 'public', 'favicon.ico')));

/*
 * Deliver the content of the public folder
 */
app.use (express.static (path.join (__dirname, 'public')));

/*
 * Use bodyParser middleware in order to get easy access to
 * the request bodies.
 */
app.use (bodyParser.json ({
  limit: '10mb',
  verify: function (req, res, buf, encoding) {
    req.rawBody = buf.toString();
  }
}));
app.use (bodyParser.urlencoded ({
  limit: '10mb',
  extended: true
}));

/*
 * Set up handlebars as view engine
 */
var hbs = exphbs.create ({
  defaultLayout: 'layout',
});
app.engine ('handlebars', hbs.engine);
app.set ('view engine', 'handlebars');
app.set ('views', path.join(__dirname, 'views'));
app.set ('partials', path.join(__dirname, 'views/partials'));

/*
 * Include the routing files.
 */
app.use ('/', require ('./routes/index.js'));

/*
 * Set the port that our server shall listen on and finally start it.
 */
app.set ('port', (process.env.PORT || 3000));
var server = app.listen (app.get ('port'), () => {
  console.log ('server started on port ' + app.get ('port'));
});
