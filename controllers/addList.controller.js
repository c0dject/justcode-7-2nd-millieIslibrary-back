const addListService = require('../services/addList.service');
const myUtil = require('../utils/myutil');

const addBookshelf = async (req, res) => {
  const user_id = req.userInfo.id;
  const { books_id } = req.body;
  myUtil.checkDataIsNotEmpty({
    books_id,
  });
  const result = await addListService.addBookshelf(user_id, books_id);
  res.status(200).json({
    result,
  });
  console.log('ADD BOOKSHELF');
};

const removeBookshelf = async (req, res) => {
  const user_id = req.userInfo.id;
  const { books_id } = req.body;
  myUtil.checkDataIsNotEmpty({
    books_id,
  });
  const result = await addListService.removeBookshelf(user_id, books_id);
  res.status(200).json({ message: result });
};

const addFavorite = async (req, res) => {
  const user_id = req.userInfo.id;
  const { books_id } = req.body;
  myUtil.checkDataIsNotEmpty({
    books_id,
  });
  const result = await addListService.addFavorite(user_id, books_id);
  res.status(200).json({
    result,
  });
  console.log('ADD FAVORITE');
};

const removeFavorite = async (req, res) => {
  const user_id = req.userInfo.id;
  const { books_id } = req.body;
  myUtil.checkDataIsNotEmpty({
    books_id,
  });
  const result = await addListService.removeFavorite(user_id, books_id);
  res.status(200).json({ message: result });
};

module.exports = { addBookshelf, removeBookshelf, addFavorite, removeFavorite };
