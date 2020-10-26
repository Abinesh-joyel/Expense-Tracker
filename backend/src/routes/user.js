const express = require('express');

const userController = require('../controller/user');

const router = express.Router();

router.post('/login', userController.loginUser);

router.post('/signup', userController.createUser);

module.exports = router;
