const reviewDao = require('../models/review.dao');

const createReview = async (user_id, books_id, content) => {
  return await reviewDao.createReview(user_id, books_id, content);
};

const updateReview = async (review_id, user_id, content) => {
  const check = await reviewDao.checkReview(review_id, user_id, content);
  if (!check[0]) {
    throw { statusCode: 400, message: 'REVIEW IS NOT EXIST' };
  } else if (check[0].users_id !== user_id) {
    throw { statusCode: 400, message: 'ONLY WRITER CAN MODIFY COMMENT' };
  } else {
    return await reviewDao.updateReview(review_id, user_id, content);
  }
};

const deleteReview = async (review_id, user_id) => {
  const check = await reviewDao.checkReview(review_id, user_id);
  if (!check[0]) {
    throw { statusCode: 400, message: 'REVIEW IS NOT EXIST' };
  } else if (check[0].users_id !== user_id) {
    throw { statusCode: 400, message: 'ONLY WRITER CAN DELETE COMMENT' };
  } else {
    return await reviewDao.deleteReview(review_id, user_id);
  }
};

module.exports = { createReview, updateReview, deleteReview };
