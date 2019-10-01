var createError = require('http-errors');
var express = require('express');
var sassMiddleware = require('node-sass-middleware');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter   = require('./routes/index');
var usersRouter   = require('./routes/users');
var aboutRouter   = require('./routes/about/index');
var projectRouter = require('./routes/project/index');
var contactRouter = require('./routes/contact/index');

var app = express();

app.use(sassMiddleware({
    src: __dirname + '/sass',
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'compressed'
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/css', express.static(path.join(__dirname + '/node_modules/bootstrap/dist/css')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/projects', projectRouter);
app.use('/contact', contactRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
