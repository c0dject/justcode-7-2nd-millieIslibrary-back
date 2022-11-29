const express = require('express');
const router = express.Router();
const { asyncWrap } = require('../utils/myutil');
const mw = require('../middlewares/middleware');

const addListController = require('../controllers/addList.controller');

router.post(
  '/bookshelf',
  asyncWrap(mw.authMiddleware),
  asyncWrap(addListController.addBookshelf)
);
router.delete(
  '/bookshelf',
  asyncWrap(mw.authMiddleware),
  asyncWrap(addListController.removeBookshelf)
);

router.post(
  '/favorite',
  asyncWrap(mw.authMiddleware),
  asyncWrap(addListController.addFavorite)
);
router.delete(
  '/favorite',
  asyncWrap(mw.authMiddleware),
  asyncWrap(addListController.removeFavorite)
);

module.exports = router;
