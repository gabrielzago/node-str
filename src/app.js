'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
const router = express.Router();

//conecta no banco
mongoose.connect('mongodb://gabriel:galu0627@ds018238.mlab.com:18238/ndstr-gabriel');

//carrega rotas
const indexRoute = require('./routes/index-route');
const productsRoute = require('./routes/product-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

app.use('/', indexRoute);
app.use('/products', productsRoute);

module.exports = app;
