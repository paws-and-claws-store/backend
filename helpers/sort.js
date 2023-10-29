// const sort = (product, sortBy) => {
//   let data = product.map((el) => el);

//   switch (sortBy) {
//     case "expensive":
//       data = data.sort((a, b) => b.items[0].price - a.items[0].price);
//       break;
//     case "cheap":
//       data = data.sort((a, b) => a.items[0].price - b.items[0].price);
//       break;

//     default:
//       break;
//   }

//   return data;

//   if (sortBy === "expensive") {
//     return data.sort((a, b) => a.items[0].price - b.items[0].price);
//   } else if (sortBy === "cheap") {
//     return product;
//   } else {
//   }

//   return product.map((el) => el).sort((a, b) => a.items[0].price - b.items[0].price);
//   //   return data.items.sort((a, b) => a.price - b.price);
// };
const { sortWeights } = require("./sortWeights");

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

  return data;
};

module.exports = sort;
