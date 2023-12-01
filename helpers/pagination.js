const sort = require('./sort');
const { LIMIT_PAGINATION } = require('../config/consts');

module.exports = async ({
  Model,
  filter = {},
  page = 1,
  limit = LIMIT_PAGINATION,
  collectionLinks = [],
  sortBy = 'cheap', // this is required field for correct using filter price
  minPrice = 0,
  maxPrice = 10000000,
  aggregate,
}) => {
  const data = {};

  try {
    let result;

    const aggregateParams = [
      {
        $unwind: '$items', // Разворачиваем массив объектов items
      },
      {
        $addFields: {
          'items.actualPrice': {
            $cond: {
              if: { $gte: ['$items.sale', 0] }, // Если есть распродажная цена
              then: '$items.sale', // Используем ее
              else: '$items.price', // Иначе используем цену товара
            },
          },
        },
      },
      {
        $match: {
          $and: [
            {
              'items.actualPrice': { $gte: Number(minPrice), $lte: Number(maxPrice) }, // Фильтр по цене actualPrice
            },
            filter,
          ],
        },
      },
      {
        $group: {
          _id: '$_id',
          // totalItems: { $sum: 1 },
          productName: { $first: '$productName' }, // Пример полей, которые могут быть в результате
          brand: { $first: '$brand' },
          shortDescription: { $first: '$shortDescription' },
          fullDescription: { $first: '$fullDescription' },
          mainImage: { $first: '$mainImage' },
          images: { $first: '$images' },
          favorite: { $first: '$favorite' },
          reviews: { $first: '$reviews' },
          _pet: { $first: '$_pet' },
          _category: { $first: '$_category' },
          _variant: { $first: '$_variant' },
          _country: { $first: '$_country' },
          updatedAt: { $first: '$updatedAt' },
          items: { $push: '$items' }, // Собираем items обратно в массив
        },
      },
      // {
      //   $project: {
      //     totalItems: 1,
      //     productName: 1,
      //     brand: 1,
      //     shortDescription: 1,
      //     fullDescription: 1,
      //     mainImage: 1,
      //     images: 1,
      //     favorite: 1,
      //     reviews: 1,
      //     _pet: 1,
      //     _category: 1,
      //     _variant: 1,
      //     _country: 1,
      //     updatedAt: 1,
      //     items: {
      //       $slice: ['$items', 0, '$totalItems'], // Оставляем только items, соответствующие общему количеству
      //     },
      //   },
      // },
    ];

    if (aggregate) {
      result = await Model.aggregate(aggregateParams);
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
