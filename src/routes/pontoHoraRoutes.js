'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../app/controllers/pontoHoraController');
const authMiddleware = require('../app/middlewares/auth');

router.use(authMiddleware);
router.post('/', controller.post);

module.exports = router;
