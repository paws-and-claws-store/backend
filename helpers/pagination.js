const {LIMIT_PAGINATION} = require('../config/consts');

module.exports = async ({
  Model,
  filter = {},
  page = 1,
  limit = LIMIT_PAGINATION,
  collectionLinks = [],
}) => {
  const data = {};

  try {
    data.docs = await Model
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate(collectionLinks.join(' '));

    data.totalDocs = await Model.count(filter);
    data.limit = limit;
    data.totalPages = Math.ceil(data.totalDocs / limit);
    data.page = page;
    data.hasNextPage = data.page < data.totalPages ? true : null;
    data.hasPrevPage = data.page > 1 ? true : null;
    data.nextPage = data.page < data.totalPages ? data.page + 1 : null;
    data.prevPage = data.page > 1 ? data.page - 1 : null;

    return data;
  } catch (err) {
    throw new Error(err);
  }
};