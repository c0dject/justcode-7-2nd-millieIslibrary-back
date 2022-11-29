const express = require('express');

const router = express.Router();

const userRouter = require('./user.router');
const reviewRouter = require('./review.router');
const bookRouter = require('./book.router');
const mw = require('../middlewares/middleware');
const categoryRouter = require('./categorypage.router');
const bookDetaliRouter = require('./bookDetail.router');
const addListRouter = require('./addList.router');
const mailRouter = require('./mail.router');

router.use('/user', userRouter);
router.use('/review', reviewRouter);
router.use('/books', bookRouter);
router.use('/category', categoryRouter);
router.use('/book-detail', bookDetaliRouter);
router.use('/add-list', addListRouter);
router.use('/mail', mailRouter);

router.use(mw.errorHandler);
module.exports = router;
