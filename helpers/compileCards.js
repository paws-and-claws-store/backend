function compileCards(arr, n) {
  const result = {};

  arr.forEach((item) => {
    if (!result[item.productName]) {
      result[item.productName] = {};
    }

    result[item.productName]['productName'] = item.productName;
    result[item.productName]['pet'] = item.pet;
    result[item.productName]['category'] = item.category;
    result[item.productName]['brand'] = item.brand;
    result[item.productName]['productType'] = item.productType;
    result[item.productName]['shortDiscription'] = item.shortDiscription;
    result[item.productName]['fullDiscription'] = item.fullDiscription;
    result[item.productName]['ingredients'] = item.ingredients;
    result[item.productName]['mainImage'] = item.mainImage;
    result[item.productName]['images'] = item.images;
    result[item.productName]['favorite'] = item.favorite;
    result[item.productName]['reviews'] = item.reviews;
    result[item.productName]['producingCountry'] = item.producingCountry;
    result[item.productName][item.size] = {
      _id: item._id,
      size: item.size,
      price: item.price,
      sale: item.sale ?? null,
      count: item.count,
      productCode: item.productCode,
    };
    if (!result[item.productName]['sale']) {
      result[item.productName]['sale'] = [];
    }
    if (item.sale) {
      result[item.productName]['sale'].push(item.size);
    }
  });

  const emptySale = [];
  const hasSale = [];

  Object.values(result).forEach((item) => {
    item.sale.length > 0
      ? hasSale.push(item)
      : emptySale.push(item);
  });

  hasSale.forEach((item) => {
    item.sale.sort((a, b) => a - b);
  });

  hasSale.sort((a, b) => a['sale'][0] - b['sale'][0]);

  return [...hasSale, ...emptySale].slice(0, n);
}

module.exports = compileCards;