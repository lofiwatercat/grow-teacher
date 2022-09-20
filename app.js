const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('./models/User');
require('./models/Post');
// require('./config/passport');
const passport = require('passport');

const debug = require('debug');
const cors = require('cors');
const csurf = require('csurf');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/api/users');
const postsRouter = require('./routes/api/posts');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

const { isProduction } = require('./config/keys');

if (!isProduction) {
    // enable CORS only in development because React will be on the React
    // development server (http://localhost:3000)
    // (In production, React files will be served statically on the Express server)
    app.use(cors());
}
  
app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );

const csrfRouter = require('./routes/api/csrf');

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/csrf', csrfRouter);
app.use('/api/posts', postsRouter);



app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.statusCode = 404;
    next(err);
  });
  
  const serverErrorLogger = debug('backend:error');
  // Express custom error handler that will be called whenever a route handler or
  // middleware throws an error or invokes the `next` function with a truthy value
  app.use((err, req, res, next) => {
    serverErrorLogger(err);
    const statusCode = err.statusCode || 500
    res.status(statusCode);
    res.json({
      message: err.message,
      statusCode,
      errors: err.errors
    })
  });
  

module.exports = app;
