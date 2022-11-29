const express = require('express');
const router = express.Router();
const { asyncWrap } = require('../utils/myutil');
const mw = require('../middlewares/middleware');

const reviewController = require('../controllers/review.controller');

router.post(
  '',
  asyncWrap(mw.authMiddleware),
  asyncWrap(reviewController.createReview)
);
router.patch(
  '',
  asyncWrap(mw.authMiddleware),
  asyncWrap(reviewController.updateReview)
);
router.delete(
  '',
  asyncWrap(mw.authMiddleware),
  asyncWrap(reviewController.deleteReview)
);

module.exports = router;
