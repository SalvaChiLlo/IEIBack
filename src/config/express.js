const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const methodOverride = require('method-override');
const express = require('express');

module.exports = (app) => {
  app.use(compression());
  app.use(express.urlencoded({ extended: false, limit: '50mb' }));
  app.use(express.json({ limit: '50mb' }));
  app.use(methodOverride());
  app.use(cors({}));
};
