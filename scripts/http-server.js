"use strict";
require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
const http = require("http");
const proxy = require('express-http-proxy');
const compression = require('compression');

const log = require('json-log').log;

const directory = process.argv[2];
const port = process.argv[3];

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(function(req, res, next) {
  log.info(req.originalUrl);
  next();
});


app.use(compression({filter: shouldCompress}))
app.use(express.static(directory));

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    return false
  }
  return compression.filter(req, res)
}

const proxyOptions = {
  proxyReqPathResolver: function(req) {
    return "/prod/fake-auth";
  },
  proxyReqOptDecorator: function(proxyReqOpts, originalReq) {
    proxyReqOpts.rejectUnauthorized = false;
    return proxyReqOpts;
  },
};

app.use("/login", proxy(`${process.env.FETCH_API_HOST}`, proxyOptions))

app.get('/livenessprobe', (req, res, next) => {
  res.json({
    'status': 'success',
    'app': 'airwallex',
    'error': '',
  });
});
// https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../', path.join(directory, 'index.html')));
});

http.createServer({}, app)
  .listen(port, () => log.info(`HTTP server listening on port ${port}, exposing directory ${directory}.`));
