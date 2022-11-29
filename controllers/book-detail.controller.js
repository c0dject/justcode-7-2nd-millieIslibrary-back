const bookDetailService = require('../services/book-detail.service');

const findDetailByBookId = async (req, res) => {
  const result = await bookDetailService.findDetailByBookId(req.params.id);
  res.status(200).json(result);
};

const checkFavoriteAndBookshelf = async (req, res) => {
  const user_id = req.userInfo.id;
  const result = await bookDetailService.checkFavoriteAndBookshelf(
    req.params.id,
    user_id
  );
  res.status(200).json(result);
};

module.exports = { findDetailByBookId, checkFavoriteAndBookshelf };
