const express = require('express');
const router = express.Router();

const { asyncWrap } = require('../utils/myutil');
const { authMiddleware } = require('../middlewares/middleware');

const { sendMailForgotPassword } = require('../controllers/mail.controller');

router.post('', asyncWrap(sendMailForgotPassword));

module.exports = router;
