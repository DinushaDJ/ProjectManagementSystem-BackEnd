var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var projectRouter = require('./routes/project');
var phaseRouter = require('./routes/phase');
var taskRouter = require('./routes/task');
var resourceRouter = require('./routes/resource');
var loginRouter = require('./routes/login');
var userRouter = require('./routes/user');

var app = express();

app.use(cors());

//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1:27017/PMS';
//mongoose.connect(mongoDB);
mongoose.connect(mongoDB, function (err, db) {
    assert.equal(null,err);
    console.log("Connected successfully to server");
});
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/projects', projectRouter);
app.use('/phases', phaseRouter);
app.use('/tasks', taskRouter);
app.use('/resources', resourceRouter);
app.use('/users', userRouter);
app.use('/login', loginRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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
