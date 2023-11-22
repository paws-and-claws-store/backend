const { sortWeights } = require("./sortWeights");

const sort = (product, sortBy) => {
  const sortedWeight = sortWeights(product);

  let data = sortedWeight.map((el) => el);

  if (!sortBy) {
    // Если sortBy не передан, сортируем так, чтобы товары без count > 0 были в конце
    data = data.sort((a, b) => {
      const hasCountA = a.items.some((item) => item.count > 0);
      const hasCountB = b.items.some((item) => item.count > 0);

      if (hasCountA && !hasCountB) {
        return -1; // Первый товар имеет count > 0, второй - нет
      }
      if (!hasCountA && hasCountB) {
        return 1; // Второй товар имеет count > 0, первый - нет
      }

      return 0;
    });

    return data;
  }

  if (sortBy) {
    switch (sortBy) {
      case "expensive":
        data = data.sort((a, b) => {
          if (a.items.some((item) => item.count > 0) && b.items.every((item) => item.count === 0)) {
            return -1; // Первый товар имеет count > 0, второй - нет
          }
          if (a.items.every((item) => item.count === 0) && b.items.some((item) => item.count > 0)) {
            return 1; // Второй товар имеет count > 0, первый - нет
          }

          const priceA = a.items[0].sale || a.items[0].price;
          const priceB = b.items[0].sale || b.items[0].price;

          return priceB - priceA;
        });
        break;
      case "cheap":
        data = data.sort((a, b) => {
          if (a.items.some((item) => item.count > 0) && b.items.every((item) => item.count === 0)) {
            return -1; // Первый товар имеет count > 0, второй - нет
          }
          if (a.items.every((item) => item.count === 0) && b.items.some((item) => item.count > 0)) {
            return 1; // Второй товар имеет count > 0, первый - нет
          }

          const priceA = a.items[0].sale || a.items[0].price;
          const priceB = b.items[0].sale || b.items[0].price;

          return priceA - priceB;
        });
        break;
      default:
        break;
    }
  }

  return data;
};

module.exports = sort;
