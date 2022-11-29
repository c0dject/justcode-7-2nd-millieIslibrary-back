const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middlewares/middleware');
const { asyncWrap } = require('../utils/myutil');

const {
  signUp,
  login,
  updateInfo,
  withdrawUser,
  getMe,
  changePassword,
} = require('../controllers/user.controller');

router.post('/signup', asyncWrap(signUp));
router.post('/login', asyncWrap(login));
router.patch('/changeinfo', asyncWrap(authMiddleware), asyncWrap(updateInfo));
router.delete('/withdraw', asyncWrap(authMiddleware), asyncWrap(withdrawUser));
router.get('/info', asyncWrap(authMiddleware), asyncWrap(getMe));
router.post('/changepw', asyncWrap(changePassword));

module.exports = router;
