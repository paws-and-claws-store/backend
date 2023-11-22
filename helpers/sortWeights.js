// sortWeights.js

// sortWeights.js

const sortWeights = (product) => {
  return product.map((el) => {
    el.items.sort((a, b) => {
      if (a.count === 0 && b.count !== 0) {
        return 1; // Продукт A имеет count = 0, а продукт B - нет, поэтому A должен быть в конце
      }
      if (a.count !== 0 && b.count === 0) {
        return -1; // Продукт B имеет count = 0, а продукт A - нет, поэтому B должен быть в конце
      }

      // Если оба продукта имеют count = 0 или count > 0, сортировка по убыванию size
      return a.size - b.size;
    });

    return el;
  });
};

const sortWe = (arr) => {
  return arr.map((item) => {
    const saled = [];
    const enable = [];
    const disable = [];

    item.items.forEach((weight) => {
      if (weight.sale) {
        saled.push(weight);
      } else if (weight.count > 0) {
        enable.push(weight);
      } else {
        disable.push(weight);
      }
    });

    item.items = [
      ...saled.sort((a, b) => a.size - b.size),
      ...enable.sort((a, b) => a.size - b.size),
      ...disable.sort((a, b) => a.size - b.size),
    ];

    return item;
  });
};

const sortWeightsOne = (item) => {
  const saled = [];
  const enable = [];
  const disable = [];

  item.items.forEach((weight) => {
    if (weight.sale) {
      saled.push(weight);
    } else if (weight.count > 0) {
      enable.push(weight);
    } else {
      disable.push(weight);
    }
  });

  item.items = [
    ...saled.sort((a, b) => a.size - b.size),
    ...enable.sort((a, b) => a.size - b.size),
    ...disable.sort((a, b) => a.size - b.size),
  ];

  return item;
};

module.exports = {
  sortWeights,
  sortWeightsOne,
  sortWe,
};
