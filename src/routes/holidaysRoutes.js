'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../app/controllers/holidaysController');

router.post('/', controller.holidays);


module.exports = router;
