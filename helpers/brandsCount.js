const brandsCount = data => {
  const filterBrands = data.reduce((prev, element) => {
    if (prev[element.brand]) {
      prev[element.brand] += 1;
      return prev;
    }
    prev[element.brand] = 1;
    return prev;
  }, {});
  return filterBrands;
};

module.exports = brandsCount;
