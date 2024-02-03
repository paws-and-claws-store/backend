// Function to count the occurrence of brands in the provided data
const brandsCount = (data, dataCategory) => {
  // Filtering and counting brands in the main data
  const filterBrands = data.reduce((prev, element) => {
    if (!prev[element.brand]) {
      prev[element.brand] = 0;
    }
    prev[element.brand] += 1;
    return prev;
  }, {});

  let filterBrandsCategoryAll;

  // If dataCategory is provided, filter and count brands in the category data
  if (dataCategory) {
    const filterBrandsCategory = dataCategory.reduce((prev, element) => {
      if (!prev[element.brand]) {
        prev[element.brand] = 0;
      }
      prev[element.brand] += 1;
      return prev;
    }, {});

    // Ensure all brands present in the main data are included, even if not in the category data
    filterBrandsCategoryAll = Object.keys(filterBrands).reduce(
      (obj, key) => {
        if (!obj[key]) {
          obj[key] = 0;
        }
        return obj;
      },
      { ...filterBrandsCategory },
    );
  }

  // Sorting the brand count object alphabetically
  function sorted(dataObject) {
    const sorted = Object.keys(dataObject)
      .sort()
      .reduce((obj, key) => {
        obj[key] = dataObject[key];
        return obj;
      }, {});
    return sorted;
  }

  // Sorting brands based on whether category data is provided or not
  const sortedBrands = sorted(dataCategory ? filterBrandsCategoryAll : filterBrands);

  return sortedBrands;
};

module.exports = brandsCount;
