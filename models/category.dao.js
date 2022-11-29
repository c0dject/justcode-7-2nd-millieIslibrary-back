const dataSource = require('.');

const createCategory = async category => {
  const insertStatus = await dataSource.query(
    `
      INSERT INTO
        categories
          (
            content
          )
      VALUES
      (?)
    `,
    [category]
  );
  return insertStatus;
};

const findCategoryByCateName = async categoryName => {
  const [foundCate] = await dataSource.query(
    `
      SELECT
        id, content
      FROM
        categories
      WHERE
        content = ?
    `,
    [categoryName]
  );
  return foundCate;
};

module.exports = { createCategory, findCategoryByCateName };
