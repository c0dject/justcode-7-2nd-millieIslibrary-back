const dataSource = require('.');

const createAuthor = async (authorName, authorIntro) => {
  const insertStatus = await dataSource.query(
    `
      INSERT INTO
        authors
          (
            author_name,
            author_intro
          )
      VALUES
      (?, ?)
    `,
    [authorName, authorIntro]
  );

  return insertStatus;
};

const findAuthorByAuthorName = async authorName => {
  const [foundAthor] = await dataSource.query(
    `
      SELECT
        id,
        author_name,
        author_intro
      FROM
        authors
      WHERE
      author_name = ?
    `,
    [authorName]
  );
  return foundAthor;
};

module.exports = { createAuthor, findAuthorByAuthorName };
