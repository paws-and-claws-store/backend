const aggregateParams = (minPrice, maxPrice, filter, sortBy) => {
  let sortValue;

  if (sortBy === 'expensive') {
    sortValue = -1; // Сортировка по весу от большего к меньшему
  } else if (sortBy === 'cheap') {
    sortValue = 1; // Сортировка по весу от меньшему к большему
  }

  const aggregationPipeline = [
    // поиск данных по oid
    {
      $lookup: {
        from: 'pets', // Название вашей коллекции с данными о _pet
        let: { petId: '$_pet' }, // Объявляем переменную для ObjectId из поля _pet
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$_id', '$$petId'] }, // Находим соответствие ObjectId в коллекции pets
            },
          },
        ],
        as: 'petData', // Название нового поля, в котором будут храниться данные о _pet
      },
    },
    {
      $lookup: {
        from: 'categories', // Название вашей коллекции с данными о категориях
        let: { categoryId: '$_category' }, // Объявляем переменную для ObjectId из поля _category
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$_id', '$$categoryId'] }, // Находим соответствие ObjectId в коллекции categories
            },
          },
        ],
        as: 'categoryData', // Название нового поля, в котором будут храниться данные о категории
      },
    },
    {
      $lookup: {
        from: 'variants', // Название вашей коллекции с данными о вариантах
        let: { variantId: '$_variant' }, // Объявляем переменную для ObjectId из поля _variant
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$_id', '$$variantId'] }, // Находим соответствие ObjectId в коллекции variants
            },
          },
        ],
        as: 'variantData', // Название нового поля, в котором будут храниться данные о варианте
      },
    },
    {
      $lookup: {
        from: 'countries', // Название вашей коллекции с данными о странах
        let: { countryId: '$_country' }, // Объявляем переменную для ObjectId из поля _country
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$_id', '$$countryId'] }, // Находим соответствие ObjectId в коллекции countries
            },
          },
        ],
        as: 'countryData', // Название нового поля, в котором будут храниться данные о стране
      },
    },
    // развертывание массивов
    {
      $unwind: '$items', // Разворачиваем массив объектов items
    },
    {
      $match: {
        'items.count': { $gt: 0 }, // Фильтр для исключения товаров с count: 0
      },
    },
    {
      $unwind: {
        path: '$petData',
        preserveNullAndEmptyArrays: true, // Для сохранения объектов, у которых нет соответствия в pets
      },
    },
    {
      $unwind: {
        path: '$categoryData',
        preserveNullAndEmptyArrays: true, // Для сохранения объектов, у которых нет соответствия в categories
      },
    },
    {
      $unwind: {
        path: '$variantData',
        preserveNullAndEmptyArrays: true, // Для сохранения объектов, у которых нет соответствия в variants
      },
    },
    {
      $unwind: {
        path: '$countryData',
        preserveNullAndEmptyArrays: true, // Для сохранения объектов, у которых нет соответствия в countries
      },
    },

    // добавление полей
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
        _pet: '$petData', // Поле _pet будет содержать данные, найденные по ObjectId
        _category: '$categoryData', // Поле _category будет содержать данные, найденные по ObjectId
        _variant: '$variantData', // Поле _variant будет содержать данные, найденные по ObjectId
        _country: '$countryData', // Поле _country будет содержать данные, найденные по ObjectId
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
    {
      $project: {
        petData: 0, // Удаляем временное поле petData
        categoryData: 0, // Удаляем временное поле categoryData
        variantData: 0, // Удаляем временное поле variantData
        countryData: 0, // Удаляем временное поле countryData
      },
    },
  ];

  // находим и задаем индекс для вставки нужной нам сортировки по весу в массиве $items
  const indexForWeightSortingAdd =
    aggregationPipeline.findIndex(obj => obj.$unwind === '$items') + 1;

  // Применяем сортировку только если sortValue определено как нам нужно
  if (sortValue === 1 || sortValue === -1) {
    aggregationPipeline.splice(indexForWeightSortingAdd, 0, {
      $sort: { 'items.size': sortValue }, // Сортировка в зависимости от значения sortValue
    });
  }
  // Если sortBy не определено, применить сортировку по полю sale
  if (sortBy === undefined) {
    // Сортировка внутри items по полю sale
    aggregationPipeline.splice(indexForWeightSortingAdd, 0, {
      $sort: {
        'items.sale': 1, // сортировка по возрастанию sale
        'items.size': 1, // сортировка по возрастанию size
      },
    });
  }

  return aggregationPipeline;
};

module.exports = { aggregateParams };
