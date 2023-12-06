const sort = require('./sort');
const { LIMIT_PAGINATION } = require('../config/consts');
const { aggregateParams } = require('./paramsData');

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

    // const aggregateParams = [
    //   // поиск данных по oid
    //   {
    //     $lookup: {
    //       from: 'pets', // Название вашей коллекции с данными о _pet
    //       let: { petId: '$_pet' }, // Объявляем переменную для ObjectId из поля _pet
    //       pipeline: [
    //         {
    //           $match: {
    //             $expr: { $eq: ['$_id', '$$petId'] }, // Находим соответствие ObjectId в коллекции pets
    //           },
    //         },
    //       ],
    //       as: 'petData', // Название нового поля, в котором будут храниться данные о _pet
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: 'categories', // Название вашей коллекции с данными о категориях
    //       let: { categoryId: '$_category' }, // Объявляем переменную для ObjectId из поля _category
    //       pipeline: [
    //         {
    //           $match: {
    //             $expr: { $eq: ['$_id', '$$categoryId'] }, // Находим соответствие ObjectId в коллекции categories
    //           },
    //         },
    //       ],
    //       as: 'categoryData', // Название нового поля, в котором будут храниться данные о категории
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: 'variants', // Название вашей коллекции с данными о вариантах
    //       let: { variantId: '$_variant' }, // Объявляем переменную для ObjectId из поля _variant
    //       pipeline: [
    //         {
    //           $match: {
    //             $expr: { $eq: ['$_id', '$$variantId'] }, // Находим соответствие ObjectId в коллекции variants
    //           },
    //         },
    //       ],
    //       as: 'variantData', // Название нового поля, в котором будут храниться данные о варианте
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: 'countries', // Название вашей коллекции с данными о странах
    //       let: { countryId: '$_country' }, // Объявляем переменную для ObjectId из поля _country
    //       pipeline: [
    //         {
    //           $match: {
    //             $expr: { $eq: ['$_id', '$$countryId'] }, // Находим соответствие ObjectId в коллекции countries
    //           },
    //         },
    //       ],
    //       as: 'countryData', // Название нового поля, в котором будут храниться данные о стране
    //     },
    //   },
    //   // развертывание массивов
    //   {
    //     $unwind: '$items', // Разворачиваем массив объектов items
    //   },
    //   {
    //     $unwind: {
    //       path: '$petData',
    //       preserveNullAndEmptyArrays: true, // Для сохранения объектов, у которых нет соответствия в pets
    //     },
    //   },
    //   {
    //     $unwind: {
    //       path: '$categoryData',
    //       preserveNullAndEmptyArrays: true, // Для сохранения объектов, у которых нет соответствия в categories
    //     },
    //   },
    //   {
    //     $unwind: {
    //       path: '$variantData',
    //       preserveNullAndEmptyArrays: true, // Для сохранения объектов, у которых нет соответствия в variants
    //     },
    //   },
    //   {
    //     $unwind: {
    //       path: '$countryData',
    //       preserveNullAndEmptyArrays: true, // Для сохранения объектов, у которых нет соответствия в countries
    //     },
    //   },

    //   // добавление полей
    //   {
    //     $addFields: {
    //       'items.originalId': { $toString: '$_id' }, // Преобразуем _id в строку и сохраняем в новом поле items.originalId
    //       'items.actualPrice': {
    //         $cond: {
    //           if: { $gte: ['$items.sale', 0] }, // Если есть распродажная цена
    //           then: '$items.sale', // Используем ее
    //           else: '$items.price', // Иначе используем цену товара
    //         },
    //       },
    //       _pet: '$petData', // Поле _pet будет содержать данные, найденные по ObjectId
    //       _category: '$categoryData', // Поле _category будет содержать данные, найденные по ObjectId
    //       _variant: '$variantData', // Поле _variant будет содержать данные, найденные по ObjectId
    //       _country: '$countryData', // Поле _country будет содержать данные, найденные по ObjectId
    //     },
    //   },

    //   {
    //     $match: {
    //       $and: [
    //         {
    //           'items.actualPrice': { $gte: Number(minPrice), $lte: Number(maxPrice) }, // Фильтр по цене actualPrice
    //         },
    //         filter,
    //       ],
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: '$_id',
    //       productName: { $first: '$productName' },
    //       brand: { $first: '$brand' },
    //       shortDescription: { $first: '$shortDescription' },
    //       fullDescription: { $first: '$fullDescription' },
    //       mainImage: { $first: '$mainImage' },
    //       images: { $first: '$images' },
    //       favorite: { $first: '$favorite' },
    //       reviews: { $first: '$reviews' },
    //       _pet: { $first: '$_pet' },
    //       _category: { $first: '$_category' },
    //       _variant: { $first: '$_variant' },
    //       _country: { $first: '$_country' },
    //       updatedAt: { $first: '$updatedAt' },
    //       items: {
    //         $push: {
    //           _id: '$items.originalId', // Присваиваем сохраненное значение _id из items.originalId
    //           size: '$items.size', // Продолжаем сохранять другие поля items
    //           price: '$items.price',
    //           count: '$items.count',
    //           productCode: '$items.productCode',
    //           actualPrice: '$items.actualPrice',
    //           sale: '$items.sale',
    //         },
    //       },
    //     },
    //   },
    //   {
    //     $project: {
    //       petData: 0, // Удаляем временное поле petData
    //       categoryData: 0, // Удаляем временное поле categoryData
    //       variantData: 0, // Удаляем временное поле variantData
    //       countryData: 0, // Удаляем временное поле countryData
    //     },
    //   },
    // ];

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
