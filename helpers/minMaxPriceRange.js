const minMaxPriceRange = data => {
  const allPrices = data.flatMap(item => {
    const priceItems = item.items.map(item => {
      if (item.sale) {
        return item.sale;
      }
      return item.price;
    });
    return priceItems;
  });

  return [Math.min(...allPrices), Math.max(...allPrices)];
};

module.exports = minMaxPriceRange;
