const dataSource = require('.');

const findDetailByBookId = async id => {
  let bookResult = await dataSource.query(
    `
    SELECT 
      b.id, 
      b.title, 
      b.cover_img, 
      b.toc, 
      b.introduction, 
      b.categories_id, 
      c.content AS categories_name,
      b.publish_time,
      b.publisher,
      b.page,
      b.rating_score,
      JSON_ARRAYAGG(
        JSON_OBJECT(
        "author_id", ba.authors_id,
        "author_intro", a.author_intro,
        "author_name", SUBSTRING_INDEX(a.author_name, " ", 1)
        )
      ) AS books_authors	
    FROM books b
    LEFT JOIN 
      categories AS c 
    ON 
      b.categories_id = c.id
    LEFT JOIN 
      books_authors AS ba 
    ON 
      b.id = ba.books_id
    LEFT JOIN 
      authors AS a 
    ON 
      a.id = ba.authors_id
    WHERE b.id = ?
    `,
    [id]
  );

  bookResult = [...bookResult].map(item => {
    return {
      ...item,
      books_authors: JSON.parse(item.books_authors),
    };
  });

  const reviewCount = await dataSource.query(
    `
    SELECT
      COUNT(r.id) AS reviews_cnt
    FROM
      books AS b
    RIGHT JOIN 
      reviews AS r 
    ON
      b.id = r.books_id
    WHERE
      b.id = ?
    `,
    [id]
  );

  const reviewArray = await dataSource.query(
    `
    SELECT
      r.id AS review_id,
      b.id AS book_id,
      r.users_id,
      u.nickname,
      r.content,
      SUBSTRING(r.created_at, 1, 16) AS created_at,
      SUBSTRING(r.updated_at, 1, 16) AS updated_at
    FROM
      books AS b
    RIGHT JOIN 
      reviews AS r 
    ON
      b.id = r.books_id
    JOIN 
      users AS u 
    ON
      r.users_id = u.id
    WHERE
      b.id = ?
    ORDER BY
      r.created_at ASC
    `,
    [id]
  );
  const reviewInfo = { reviewCount, reviewArray };

  return { bookResult, reviewInfo };
};

// 찜하기, 담기 체크
const checkFavoriteAndBookshelf = async (id, user_id) => {
  return await dataSource
    .query(
      `
    SELECT
      EXISTS (
        SELECT
          id
        FROM
          favorites
        WHERE
          books_id = '${id}'
          AND users_id = '${user_id}'
      ) AS check_favorite,
      EXISTS (
          SELECT
            id
          FROM
            bookshelves
          WHERE
            books_id = '${id}'
            AND users_id = '${user_id}'
      ) AS check_bookshelf
    `
    )
    .then(value => {
      const [item] = value;
      return {
        check_favorite: item.check_favorite == 1,
        check_bookshelf: item.check_bookshelf == 1,
      };
    });
};

module.exports = { findDetailByBookId, checkFavoriteAndBookshelf };
