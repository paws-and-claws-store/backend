const sort = require('./sort');
const { LIMIT_PAGINATION } = require('../config/consts');
const { aggregateParams } = require('./paramsData');

module.exports = async ({
  Model,
  filter = {},
  page = 1,
  limit = LIMIT_PAGINATION,
  collectionLinks = [],
  sortBy,
  minPrice = 0,
  maxPrice = 10000000000,
  aggregate,
}) => {
  const data = {};

  try {
    let result;

    if (aggregate) {
      result = await Model.aggregate(aggregateParams(minPrice, maxPrice, filter));
      data.totalDocs = result.length;
    } else {
      result = await Model.find(filter, '-min_sale').populate(collectionLinks.join(' '));
      data.totalDocs = await Model.count(filter);
    }
    //  const result = await Model.find(filter, '-min_sale').populate(collectionLinks.join(' '));
    // const result = await Model.aggregate(aggregateParams);

    const sortedResult = sort(result, sortBy);

    const paginatedResult = sortedResult.slice((page - 1) * limit, page * limit);

    data.docs = paginatedResult;
    // data.totalDocs = result.length;
    // data.totalDocs = await Model.count(filter);
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
