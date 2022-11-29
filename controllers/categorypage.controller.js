const categorypageService = require('../services/categorypage.service');

const findCategoryAll = async (req, res) => {
  const data = await categorypageService.findCategoryAll();

  res.status(200).json({ message: 'success', data });
};

const searchList = async (req, res) => {
  const { text } = req.body;

  const data = await categorypageService.searchList(text);

  res.status(200).json({ message: 'success', data });
};

const findBooksByCateId = async (req, res) => {
  const category_id = req.params.categoryId;

  const data = await categorypageService.findBooksByCateId(category_id);

  res.status(200).json({ message: 'success', data });
};

const findAuthorRandom = async (req, res) => {
  const data = await categorypageService.findAuthorRandom();

  res.status(200).json({ message: 'success', data });
};

const findBooksRandom = async (req, res) => {
  const data = await categorypageService.findBooksRandom();

  res.status(200).json({ message: 'success', data });
};

module.exports = {
  findCategoryAll,
  searchList,
  findBooksByCateId,
  findAuthorRandom,
  findBooksRandom,
};
