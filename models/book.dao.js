const dataSource = require('.');

const createBook = async ({
  title,
  coverImg,
  toc,
  introduction,
  categoryId,
  publishTime,
  publisher,
  ratingScore,
  page,
}) => {
  const insertStatus = await dataSource.query(
    `
      INSERT INTO
        books
          (
            title,
            cover_img,
            toc,
            introduction,
            categories_id,
            publish_time,
            publisher,
            rating_score,
            page
          )
      VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      title,
      coverImg,
      toc,
      introduction,
      categoryId,
      publishTime,
      publisher,
      ratingScore,
      page,
    ]
  );

  return insertStatus;
};

const createBookAuthor = async (booksId, authorsId) => {
  const insertStatus = await dataSource.query(
    `
      INSERT INTO
        books_authors
          (
            books_id,
            authors_id
          )
      VALUES
      (?, ?)
    `,
    [booksId, authorsId]
  );

  return insertStatus;
};

const findBooks = async serchOption => {
  let {
    categoriesId,
    authorsId,
    authorName,
    booksId,
    categoryName,
    publisher,
    limit,
    order,
    usersId,
    showMyBooks,
  } = serchOption;

  if (!Number.isInteger(limit)) {
    limit = undefined;
  }

  const NOT_NULL_STATE = 'IS NOT NULL';
  const categoriesIdState = categoriesId  ? `= '${categoriesId}'` : NOT_NULL_STATE;
  const authorsIdState    = authorsId     ? `= '${authorsId}'`    : NOT_NULL_STATE;
  const authorNameState   = authorName    ? `= '${authorName}'`   : NOT_NULL_STATE;
  const booksIdStateState = booksId       ? `= '${booksId}'`      : NOT_NULL_STATE;
  const categoryNameState = categoryName  ? `= '${categoryName}'` : NOT_NULL_STATE;
  const publisherState    = publisher     ? `= '${publisher}'`    : NOT_NULL_STATE;
  const userIdState       = usersId       ? `= '${usersId}'`      : NOT_NULL_STATE;
  const limitState        = limit         ? `LIMIT ${limit}`      : '';
  const orderPairMap = {
    rating: 'rating_score',
    page: 'page',
    publishTime: 'publish_time',
  };
  const orderStateItem =
    order &&
    order.map(orderItem => {
      const key = orderItem[0];
      const ordering = orderItem[1];
      return `${orderPairMap[key]} ${ordering}`;
    });

  const orderState = orderStateItem
    ? `ORDER BY ${orderStateItem.join(',')}`
    : '';

  const foundBooks = await dataSource.query(
    `
      SELECT
        title,
        cover_img,
        introduction,
        toc,
        publish_time,
        publisher,
        author_name,
        author_intro,
        rating_score,
        categories.content AS category,
        books.page
      FROM
        books
        JOIN books_authors
          ON books_authors.books_id = books.id
        JOIN authors
          ON authors.id = books_authors.authors_id
        JOIN categories
          ON categories.id = books.categories_id
        ${
          showMyBooks
            ? `
        JOIN bookshelves
          ON bookshelves.books_id = books.id`
            : ''
        }
      WHERE
          books.id ${booksIdStateState}
        AND
          books.categories_id ${categoriesIdState}
        AND
          authors.id ${authorsIdState}
        AND
          authors.author_name ${authorNameState}
        AND
          categories.content ${categoryNameState}
        AND
          books.publisher ${publisherState}
        ${
          showMyBooks
            ? `
        AND
          bookshelves.users_id ${userIdState}`
            : ''
        }
      ${orderState} -- ORDER BY ...
      ${limitState} -- LIMIT 10
    `,
    [booksId, categoriesId, authorsId, authorName]
  );
  console.log("found book's length: ", foundBooks.length);
  if (booksId) {
    return foundBooks[0];
  }
  return foundBooks;
};

module.exports = { createBook, createBookAuthor, findBooks };
