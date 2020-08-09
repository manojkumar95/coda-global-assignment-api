console.log('Starting Environment - ' + process.env.NODE_ENV);

const config = require('config')
const express = require('express'),
    db = require('./app/helpers/db'),
    cookieParser = require('cookie-parser'),
    cors = require('cors'),
    moment = require('moment'),
    helmet = require('helmet'),
    _ = require('lodash'),
    app = express()

const defaultRoute = require('./app/routes/index.js')
const userRoutes = require('./app/routes/user.routes.js')
const candidateRoutes = require('./app/routes/candidate.routes.js')


app.use(cookieParser(config.cookieSecret));

db.connect();

const nocache = (req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
};

const corsAllowedDomains = config.get('corsAllowedDomains')

const corsOptions = {
  origin: function (origin, callback) {
    if (_.includes(corsAllowedDomains,'*') && corsAllowedDomains.length === 1) {
      return callback(null, true)
    } 

    if (corsAllowedDomains.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      console.log('ALERT! Request from unallowed domain: ', origin)
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))
app.use(helmet());

app.use(nocache);

app.use(express.urlencoded({
  extended: true
}));

app.use(express.json({
  strict: false
}));

app.use('/', defaultRoute);
app.use('/api/', userRoutes);
app.use('/api/', candidateRoutes);

/**
 * Exposing global variables
 * so that it can be accessed across views
 */
app.locals.moment = moment;

app.use(function xhrErrorhandler(err, req, res, next){
  if(req.xhr) {
    console.error(err);
    console.error(err && err.stack);
      return res.status(500).json({
        'error': 'An unknown error has occured'
      });
  } else {
    next(err);
  }
});

app.use(function onError(err, req, res, next) {
    console.error(err);
    console.error(err && err.stack)
});

module.exports = app;
