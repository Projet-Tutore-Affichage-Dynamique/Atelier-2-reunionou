let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let cors = require('cors');

let authRouter = require('./routes/auth');
let eventsRouter = require('./routes/events');

let authMW = require('./middleware/auth');

let app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use('*', cors());
app.use(authMW);
// routes
app.use('/events', eventsRouter);
app.use('/auth', authRouter);
/* ----- GESTION DES MAUVAISES URL's ------ */
app.use('*', function(req, res, next){
  res.status(400).json({
    "type": "error",
    "error": "400",
    "message": "L'URL suivante n'est pas correct : "+req.protocol + '://' + req.get('host') + req.originalUrl,
  });
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  let message = err.message;
  let error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(500).json({'message': message, 'error': error});
});

module.exports = app;
