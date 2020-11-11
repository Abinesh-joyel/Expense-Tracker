const express = require('express');
const reportController = require('../controller/report');
const authCheck = require('../middleware/check-auth');
const router = express.Router();

router.post('/createpdf', reportController.createPDF);

module.exports = router;
