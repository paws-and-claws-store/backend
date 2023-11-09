const { Product } = require("../../models/product");
const { pagination, sort, HttpError } = require("../../helpers");

const checkBasket = async (req, res) => {
  const { array } = req.body;
  const results = [];
  const errorCods = [];

  await Promise.all(
    array.map(async (el) => {
      const result = await Product.findOne({ "items.productCode": el.productCode });

      const obj = result.items.find((item) => item.productCode === el.productCode);

      if (obj.count < el.cardСount) {
        // throw HttpError(400, `Is not enouht this product ${el.productCode}`);
        errorCods.push(obj);
      } else {
        results.push(obj);
      }
    })
  );

  if (errorCods.length > 0) {
    res.status(400).json({
      code: 400,
      data: results,
      errors: errorCods,
    });
  }
  res.json({
    code: 200,
    data: results,
  });
};

module.exports = checkBasket;
