const dataSource = require('.');

// 담기 체크
const checkAddedBookshelf = async (user_id, books_id) => {
  return await dataSource.query(
    `
    SELECT
      id,
      users_id
    FROM
      bookshelves
    WHERE
      books_id = '${books_id}'
      AND users_id = '${user_id}'
    `
  );
};

// 담기 추가
const addBookshelf = async (user_id, books_id) => {
  await dataSource.query(
    `
      INSERT
        bookshelves
      SET
        users_id = ${user_id},
        books_id = ${books_id}
      `
  );
  return await dataSource.query(
    `
      SELECT
          bs.id,
          bs.users_id,
          b.id AS books_id,
          b.title,
          u.nickname
      FROM 
        bookshelves AS bs
      LEFT JOIN 
        books AS b 
      ON 
        b.id = bs.books_id
      LEFT JOIN 
        users AS u 
      ON u.id = bs.users_id
      WHERE 
        bs.users_id = ${user_id} AND bs.books_id = ${books_id}
  
      `
  );
};

// 담기 취소
const removeBookshelf = async (user_id, books_id) => {
  await dataSource.query(
    `
      DELETE
      FROM
        bookshelves
      WHERE 
        users_id = ${user_id}
        AND books_id = ${books_id}
      `
  );
  return 'BOOKSHELF IS REMOVED';
};

// 찜하기 체크
const checkAddedFavorite = async (user_id, books_id) => {
  return await dataSource.query(
    `
    SELECT
      id,
      users_id
    FROM
      favorites
    WHERE
      books_id = '${books_id}'
      AND users_id = '${user_id}'
    `
  );
};

// 찜하기 추가
const addFavorite = async (user_id, books_id) => {
  await dataSource.query(
    `
      INSERT
        favorites
      SET
        users_id = ${user_id},
        books_id = ${books_id}
      `
  );
  return await dataSource.query(
    `
      SELECT
          f.id,
          f.users_id,
          b.id AS books_id,
          b.title,
          u.nickname
      FROM 
        favorites AS f
      LEFT JOIN 
        books AS b 
      ON 
        b.id = f.books_id
      LEFT JOIN 
        users AS u 
      ON u.id = f.users_id
      WHERE 
        f.users_id = ${user_id} AND f.books_id = ${books_id}
  
      `
  );
};

// 찜하기 취소
const removeFavorite = async (user_id, books_id) => {
  await dataSource.query(
    `
      DELETE
      FROM
        favorites
      WHERE 
        users_id = ${user_id}
        AND books_id = ${books_id}
      `
  );
  return 'FAVORITE IS REMOVED';
};

module.exports = {
  checkAddedBookshelf,
  addBookshelf,
  removeBookshelf,
  checkAddedFavorite,
  addFavorite,
  removeFavorite,
};
