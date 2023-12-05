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
  maxPrice = 10000000000,
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
          'items.originalId': { $toString: '$_id' }, // Преобразуем _id в строку и сохраняем в новом поле items.originalId
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
          productName: { $first: '$productName' },
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
          items: {
            $push: {
              _id: '$items.originalId', // Присваиваем сохраненное значение _id из items.originalId
              size: '$items.size', // Продолжаем сохранять другие поля items
              price: '$items.price',
              count: '$items.count',
              productCode: '$items.productCode',
              actualPrice: '$items.actualPrice',
              sale: '$items.sale',
            },
          },
        },
      },
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
