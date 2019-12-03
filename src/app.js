'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());

//Carregando as Models
const CompanyConfig = require('./app/model/CompanyConfig');
const UserCompany = require('./app/model/UserCompany');
const User = require('./app/model/User');

// Carrega as rotas
const copyright = "require"('./routes/copyright');
const authRoutes = require('./routes/authRoutes');
const companyRoutes = require('./routes/companyRoutes');
const holidaysRoutes = require('./routes/holidaysRoutes');
const pontoHora = require('./routes/pontoHoraRoutes');

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', copyright);
app.use('/auth', authRoutes);
app.use('/company', companyRoutes);
app.use('/holidays', holidaysRoutes);
app.use('/ponto', pontoHora);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
});