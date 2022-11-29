const bookDetailDao = require('../models/book-detail.dao');

// 북 상세 페이지
const findDetailByBookId = async id => {
  return await bookDetailDao.findDetailByBookId(id);
};

// 찜하기 체크
const checkFavoriteAndBookshelf = async (id, user_id) => {
  return await bookDetailDao.checkFavoriteAndBookshelf(id, user_id);
};

module.exports = { findDetailByBookId, checkFavoriteAndBookshelf };
