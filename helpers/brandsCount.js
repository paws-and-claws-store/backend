const brandsCount = data => {
  const filterBrands = data.reduce((prev, element) => {
    const zeroCount = element.items.every(item => item.count === 0);
    if (zeroCount) {
      prev[element.brand] = 0;
      return prev;
    }

    if (prev[element.brand] >= 1) {
      prev[element.brand] += 1;
      return prev;
    }

    if (!zeroCount) {
      prev[element.brand] = 1;
      return prev;
    }
  }, {});

  const sortedBrands = Object.keys(filterBrands)
    .sort()
    .reduce((obj, key) => {
      obj[key] = filterBrands[key];
      return obj;
    }, {});

  return sortedBrands;
};

module.exports = brandsCount;
