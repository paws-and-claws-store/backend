const sort = require('./sort');
const { LIMIT_PAGINATION } = require('../config/consts');
const { aggregateParams } = require('./paramsData');
const brandsCount = require('./brandsCount');
const minMaxPriceRange = require('./minMaxPriceRange');

module.exports = async ({
  Model,
  filter = {},
  page = 1,
  limit = LIMIT_PAGINATION,
  collectionLinks = [],
  sortBy = 'cheap', // this fiels is required, beacause load more work uncorrectly response goods the same goods
  minPrice = 0,
  maxPrice = 10000000000,
  brands, // string of brands, split by comma
  availability,
  aggregate,
  category,
}) => {
  const data = {};

  try {
    let result;

    if (aggregate) {
      result = await Model.aggregate(
        aggregateParams({
          minPrice,
          maxPrice,
          filter,
          sortBy,
          brands,
          availability,
          category,
        }),
      );

      data.totalDocs = result.length;
      data.brands = brandsCount(result);
      data.minMax = minMaxPriceRange(result);
    } else {
      result = await Model.find(filter, '-min_sale').populate(collectionLinks.join(' '));
      data.totalDocs = await Model.count(filter);
    }

    const sortedResult = sort(result, sortBy, aggregate);
    const paginatedResult = sortedResult.slice((page - 1) * limit, page * limit);

    data.docs = paginatedResult;
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
