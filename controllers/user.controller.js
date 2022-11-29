const userService = require('../services/user.service');
const { checkDataIsNotEmpty } = require('../utils/myutil');

const signUp = async (req, res) => {
  const { email, password, nickname } = req.body;
  const REQUIRED_KEYS = {
    email,
    password,
    nickname,
  };

  checkDataIsNotEmpty(REQUIRED_KEYS);

  await userService.signUp(email, password, nickname);

  res.status(201).json({ message: `${email} signup success` });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const REQUIRED_KEYS = {
    email,
    password,
  };
  checkDataIsNotEmpty(REQUIRED_KEYS);

  const token = await userService.login(email, password);

  res.status(200).json({ message: 'login success', token: token });
};

const updateInfo = async (req, res) => {
  const { password, nickname } = req.body;
  const user_id = req.userInfo.id;
  //나중에 oauth적용시 비밀번호는 Null 값이라 service단에서 Oauth로그인시 비밀번호 변경이 불가능하게 설정해야함
  await userService.updateInfo(password, nickname, user_id);

  res.status(200).json({ message: 'userinfo change success' });
};

const withdrawUser = async (req, res) => {
  const user_id = req.userInfo.id;

  await userService.withdrawUser(user_id);

  res.status(200).json({ message: 'User withdraw success' });
};

const getMe = async (req, res) => {
  const user_id = req.userInfo.id;

  let userInfo = await userService.getMe(user_id);

  res.status(200).json({ message: 'success', userInfo });
};

const changePassword = async (req, res) => {
  const { email, password } = req.body;

  const REQUIRED_KEYS = {
    email,
    password,
  };

  checkDataIsNotEmpty(REQUIRED_KEYS);

  await userService.changePassword(email, password);

  res.status(200).json({ message: 'success' });
};

module.exports = {
  signUp,
  login,
  updateInfo,
  withdrawUser,
  getMe,
  changePassword,
};
