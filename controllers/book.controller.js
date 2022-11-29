const bookServ = require('../services/book.service');
const myUtil = require('../utils/myutil.js');
const { authMiddleware } = require('../middlewares/middleware');

async function createBook(req, res) {
  const book = ({
    title,
    author,
    authorIntro,
    category,
    coverImg,
    introduction,
    toc,
    publishTime,
    publisher,
    ratingScore,
    page,
  } = req.body);
  myUtil.checkDataIsNotEmpty(book);
  await bookServ.createBook(book);
  res.json('생성 완료');
}

const findBooks = async (req, res) => {
  if (req.query.myBookshelve || req.query.myFavorite) {
    authMiddleware(req, res, () => {});
  }
  let serchOption = req.query;
  serchOption = {
    ...serchOption,
    booksId: req.params.id,
    usersId: req.userInfo?.id,
  };
  const result = await bookServ.findBooks(serchOption);
  res.json(result);
};

const dbIndexUniqueTitle = async (req, res) => {
  const result = await bookServ.dbIndexUniqueTitle();
  res.json(result);
};

module.exports = { createBook, findBooks, dbIndexUniqueTitle };
