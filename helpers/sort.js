const { sortWeights } = require("./sortWeights");

const sortCount = (data) => {
  return (data = data.sort((a, b) => {
    if (a.items[0].count === 0 && b.items[0].count !== 0) {
      return 1; // Перший елемент має count = 0, другий - ні
    }
    if (a.items[0].count !== 0 && b.items[0].count === 0) {
      return -1; // Другий елемент має count = 0, перший - ні
    }
    return 0; // Залиште їх в тому ж порядку, якщо обидва мають count = 0 або не мають
  }));
};

const sort = (product, sortBy) => {
  const sortedWeight = sortWeights(product);

  let data = sortedWeight.map((el) => el);

  switch (sortBy) {
    case "expensive":
      data = data.sort((a, b) => {
        if (a.items[0].sale && b.items[0].sale) {
          return b.items[0].sale - a.items[0].sale;
        }
        if (a.items[0].sale) {
          return -1; // Первый товар имеет скидку, второй нет
        }
        if (b.items[0].sale) {
          return 1; // Второй товар имеет скидку, первый нет
        }
        return b.items[0].price - a.items[0].price; // Обычная сортировка по цене
      });
      break;
    case "cheap":
      data = data.sort((a, b) => {
        if (a.items[0].sale && b.items[0].sale) {
          return a.items[0].sale - b.items[0].sale;
        }
        if (a.items[0].sale) {
          return -1; // Первый товар имеет скидку, второй нет
        }
        if (b.items[0].sale) {
          return 1; // Второй товар имеет скидку, первый нет
        }
        return a.items[0].price - b.items[0].price; // Обычная сортировка по цене
      });
      break;
    default:
      break;
  }

  const results = sortCount(data);

  return results;
};

module.exports = sort;
