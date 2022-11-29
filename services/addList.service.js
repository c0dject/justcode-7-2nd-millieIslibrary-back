const addListDao = require('../models/addList.dao');

const addBookshelf = async (user_id, books_id) => {
  const check = await addListDao.checkAddedBookshelf(user_id, books_id);
  if (check[0]) {
    throw { statusCode: 400, message: 'ALREADY BOOKSHELF ADDED' };
  } else {
    return await addListDao.addBookshelf(user_id, books_id);
  }
};

const removeBookshelf = async (user_id, books_id) => {
  const check = await addListDao.checkAddedBookshelf(user_id, books_id);
  if (!check[0]) {
    throw { statusCode: 400, message: 'BOOKSHELF IS NOT EXIST' };
  } else if (check[0].users_id !== user_id) {
    throw { statusCode: 400, message: 'ONLY OWNER CAN DELETE' };
  } else {
    return await addListDao.removeBookshelf(user_id, books_id);
  }
};

const addFavorite = async (user_id, books_id) => {
  const check = await addListDao.checkAddedFavorite(user_id, books_id);
  console.log('check =', check);
  if (check[0]) {
    throw { statusCode: 400, message: 'ALREADY FAVORITE ADDED' };
  } else {
    return await addListDao.addFavorite(user_id, books_id);
  }
};

const removeFavorite = async (user_id, books_id) => {
  const check = await addListDao.checkAddedFavorite(user_id, books_id);
  if (!check[0]) {
    throw { statusCode: 400, message: 'FAVORITE IS NOT EXIST' };
  } else if (check[0].users_id !== user_id) {
    throw { statusCode: 400, message: 'ONLY OWNER CAN DELETE' };
  } else {
    return await addListDao.removeFavorite(user_id, books_id);
  }
};

module.exports = { addBookshelf, removeBookshelf, addFavorite, removeFavorite };
