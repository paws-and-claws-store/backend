const categories = data => {
  const resultObject = {};

  for (const item of data) {
    if (!resultObject[item._pet._id]) {
      resultObject[item._pet._id] = {
        code: item._pet.code,
        en: item._pet.en,
        ua: item._pet.ua,
        count: 0,
        _categories: {},
        _id: item._pet._id,
      };
    }

    if (!resultObject[item._pet._id]._categories[item._category._id]) {
      resultObject[item._pet._id]._categories[item._category._id] = {
        code: item._category.code,
        en: item._category.en,
        ua: item._category.ua,
        count: 0,
        _variants: {},
        _id: item._category._id,
        _pet: item._category._pet,
      };
    }

    if (!resultObject[item._pet._id]._categories[item._category._id]._variants[item._variant._id]) {
      resultObject[item._pet._id]._categories[item._category._id]._variants[item._variant._id] = {
        code: item._variant.code,
        en: item._variant.en,
        ua: item._variant.ua,
        count: 0,
        _category: item._variant._category,
        _id: item._variant._id,
        _pet: item._variant._pet,
      };
    }
    // Збільшуємо лічильники
    resultObject[item._pet._id].count += 1;
    resultObject[item._pet._id]._categories[item._category._id].count += 1;
    resultObject[item._pet._id]._categories[item._category._id]._variants[
      item._variant._id
    ].count += 1;
  }

  // Трансформуємо об'єкти в масиви для виводу
  const resultArray = Object.values(resultObject).map(pet => {
    pet._categories = Object.values(pet._categories).map(category => {
      category._variants = Object.values(category._variants);
      return category;
    });
    return pet;
  });

  return resultArray;
};

module.exports = categories;
