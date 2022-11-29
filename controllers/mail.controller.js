const mailService = require('../services/mail.service');

const { ForgotPassword } = require('../utils/mailformat');

const { checkDataIsNotEmpty } = require('../utils/myutil');

const sendMailForgotPassword = async (req, res) => {
  const { email } = req.body;

  const REQUIRED_KEYS = email;

  checkDataIsNotEmpty(REQUIRED_KEYS);

  await mailService.sendMailForgotPassword(email);

  const authenNum = await ForgotPassword(email);

  res.status(200).json({ message: 'Sent Auth Email', authenNum });
};

module.exports = { sendMailForgotPassword };
