const myDataSource = require('../models/index');

const findCategoryAll = async () => {
  const result = await myDataSource.query(`
    SELECT  
      id,
      content,
      (SELECT cover_img FROM books WHERE categories.id = books.categories_id ORDER BY RAND() LIMIT 1) AS cover_img
    FROM
      categories
  `);

  return result;
};

const searchList = async text => {
  const result = await myDataSource.query(
    `
    SELECT
      id, title
    FROM
      books
    WHERE title
    LIKE
      "${text}%"
    OR
    REPLACE
      (title, ' ', '')
    LIKE
      "${text}%"
  `
  );
  return result;
};

const findBooksByCateId = async category_id => {
  let listInfo = await myDataSource.query(
    `
    SELECT
      categories.content,
    JSON_ARRAYAGG(
      JSON_OBJECT(
        "id", books.id,
        "title", books.title,
        "cover_img", books.cover_img,
        "author_name", authors.author_name
      )
    ) AS books
    FROM
      categories
    JOIN
      books
    ON
      books.categories_id = categories.id
    JOIN
      books_authors
    ON
      books_authors.books_id = books.id
    JOIN
      authors
    ON
      authors.id = books_authors.authors_id
    WHERE
      categories.id = ?
    GROUP BY
      categories.id
  `,
    [category_id]
  );

  listInfo = [...listInfo].map(item => {
    return { ...item, books: JSON.parse(item.books) };
  });
  return listInfo;
};

const findAuthorRandom = async () => {
  const result = await myDataSource.query(`
    SELECT
      author_name
    FROM
      authors
    ORDER BY RAND() LIMIT 10
  `);
  return result;
};

const findBooksRandom = async () => {
  const result = await myDataSource.query(`
    SELECT
      id, title
    FROM
      books
    WHERE
      CHAR_LENGTH(title) <= 10
    ORDER BY RAND() LIMIT 20
  `);
  return result;
};

module.exports = {
  findCategoryAll,
  searchList,
  findBooksByCateId,
  findAuthorRandom,
  findBooksRandom,
};
