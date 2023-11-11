const { Product } = require("../../models/product");
const { pagination, sort, HttpError, isEnough } = require("../../helpers");

const checkBasket = async (req, res) => {
  const results = await isEnough(req, res);

  res.json({
    code: 200,
    data: results,
  });
};

module.exports = checkBasket;
