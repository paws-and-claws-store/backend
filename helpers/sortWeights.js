const sortWeights = (arr) => {
  
  return arr.map(item => {

    const saled = [];
    const enable = [];
    const disable = [];
    
    item.items.forEach(weight => {
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

  item.items.forEach(weight => {
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
};