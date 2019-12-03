'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../app/controllers/companyController');
const authMiddleware = require('../app/middlewares/auth');

router.use(authMiddleware);
router.post('/register', controller.companyPost);
router.post('/functionary', controller.functionaryPost);

module.exports = router;
