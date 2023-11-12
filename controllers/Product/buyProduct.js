const { Product } = require("../../models/product");
const { HttpError, isEnough } = require("../../helpers");
const consts = require("../../config/consts");
const { array } = require("joi");

const buyProduct = async (req, res) => {
  const { array } = req.body;

  const results = await isEnough(req, res);

  if (results.error) {
    await Promise.all(
      array.map(async (el) => {
        const result = await Product.findOne({ "items.productCode": el.productCode });

        let obj = result.items.find((item) => item.productCode === el.productCode);

        obj.count -= el.cardCount;

        result.save();
      })
    );
  } else {
    return;
  }

  res.json({
    code: 200,
    message: "Success operation",
  });
};

module.exports = buyProduct;
