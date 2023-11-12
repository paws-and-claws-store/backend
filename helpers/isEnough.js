const { Product } = require("../models/product");

const isEnought = async (req, res) => {
  const { array } = req.body;
  const results = [];

  const errorCods = [];

  await Promise.all(
    array.map(async (el) => {
      const result = await Product.findOne({ "items.productCode": el.productCode });

      const obj = result.items.find((item) => item.productCode === el.productCode);

      if (obj.count < el.cardCount) {
        errorCods.push(obj);
      } else {
        results.push(obj);
      }
    })
  );

  if (errorCods.length > 0) {
    return res.status(400).json({
      code: 400,
      data: results,
      errors: errorCods,
    });
  }

  return results;
};

module.exports = isEnought;
