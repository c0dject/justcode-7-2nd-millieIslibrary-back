const express = require('express');
const router = express.Router();

const { asyncWrap } = require('../utils/myutil');
const { authMiddleware } = require('../middlewares/middleware');

const {
  findCategoryAll,
  searchList,
  findBooksByCateId,
  findAuthorRandom,
  findBooksRandom,
} = require('../controllers/categorypage.controller');

router.get('/info', asyncWrap(findCategoryAll));
router.get('/bookrandom', asyncWrap(findBooksRandom));
router.get('/authorrandom', asyncWrap(findAuthorRandom));
router.post('/search', asyncWrap(searchList));
router.get('/:categoryId', asyncWrap(findBooksByCateId));

module.exports = router;
