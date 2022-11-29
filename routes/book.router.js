const express = require('express');
const bookCtl = require('../controllers/book.controller');
const { asyncWrap } = require('../utils/myutil');

const router = express.Router();

router.post('/', asyncWrap(bookCtl.createBook));

router.get('/', asyncWrap(bookCtl.findBooks));
router.get('/dbindex', asyncWrap(bookCtl.dbIndexUniqueTitle));
router.get('/:id', asyncWrap(bookCtl.findBooks));

module.exports = router;
