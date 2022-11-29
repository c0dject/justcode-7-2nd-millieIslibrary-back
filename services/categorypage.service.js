const categorypageDao = require('../models/categorypage.dao');

const findCategoryAll = async () => {
  let result = await categorypageDao.findCategoryAll();
  return result;
};

const searchList = async text => {
  let result = await categorypageDao.searchList(text);
  return result;
};

const findBooksByCateId = async category_id => {
  let result = await categorypageDao.findBooksByCateId(category_id);
  return result;
};

const findAuthorRandom = async () => {
  let result = await categorypageDao.findAuthorRandom();
  return result;
};

const findBooksRandom = async () => {
  let result = await categorypageDao.findBooksRandom();
  return result;
};

module.exports = {
  findCategoryAll,
  searchList,
  findBooksByCateId,
  findAuthorRandom,
  findBooksRandom,
};
