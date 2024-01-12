const brandsCount = data => {
  const filterBrands = data.reduce((prev, element) => {
    if (!prev[element.brand]) {
      prev[element.brand] = 0;
    }
    prev[element.brand] += 1;
    return prev;
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
