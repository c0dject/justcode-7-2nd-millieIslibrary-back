const mailDao = require('../models/mail.dao');

const sendMailForgotPassword = async email => {
  if (!email.includes('@') || !email.includes('.')) {
    const error = new Error('Email-Invalid');
    error.statusCode = 400;
    throw error;
  }

  const userInfo = await mailDao.sendMailForgotPassword(email);

  if (!userInfo) {
    const error = new Error("User doesn't exist");
    error.statusCode = 404;
    throw error;
  }
};

module.exports = { sendMailForgotPassword };
