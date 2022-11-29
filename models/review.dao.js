const dataSource = require('.');

// 리뷰 등록
const createReview = async (user_id, books_id, content) => {
  await dataSource.query(
    `
    INSERT 
      reviews
    SET 
      users_id=${user_id}, books_id=${books_id}, content='${content}'
    `
  );
  return await dataSource.query(
    `
    SELECT
        r.id,
        r.users_id,
        b.id AS books_id,
        b.title,
        u.nickname,
        r.content,
        SUBSTRING(r.created_at,1,16) AS created_at,
        SUBSTRING(r.updated_at,1,16) AS updated_at
    FROM 
      reviews AS r
    LEFT JOIN 
      books AS b 
    ON 
      b.id = r.books_id
    LEFT JOIN 
      users AS u 
    ON u.id = r.users_id
    WHERE 
      r.users_id = ${user_id} AND r.books_id = ${books_id}
    ORDER BY 
      r.id DESC
    LIMIT 1
    `
  );
};

// 리뷰 체크
const checkReview = async (review_id, user_id, content) => {
  return await dataSource.query(
    `
    SELECT 
      * 
    FROM 
      reviews 
    WHERE 
      id='${review_id}'
    `
  );
};

// 리뷰 수정
const updateReview = async (review_id, user_id, content) => {
  await dataSource.query(
    `
      UPDATE 
        reviews 
      SET 
        content='${content}' 
      WHERE 
        id=${review_id}
      `
  );
  return await dataSource.query(
    `
      SELECT 
        id,
        content,
        books_id,
        users_id,
        SUBSTRING(created_at,1,16) AS created_at,
        SUBSTRING(updated_at,1,16) AS updated_at
      FROM 
        reviews 
      WHERE 
        id = ${review_id}
      ORDER BY 
        created_at ASC;
      `
  );
};

// 리뷰 삭제
const deleteReview = async (review_id, user_id) => {
  await dataSource.query(
    `
      DELETE FROM 
        reviews 
      WHERE 
        id=${review_id}
      `
  );
  return 'REVIEW DELETED';
};

module.exports = { createReview, updateReview, deleteReview, checkReview };
