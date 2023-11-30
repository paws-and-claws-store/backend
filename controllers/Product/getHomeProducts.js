const { Product } = require("../../models/product");
const { sortWeights, sort, sortWe } = require("../../helpers");
const { LIMIT_PAGINATION } = require("../../config/consts");

const getHomeProducts = async (req, res) => {
  const { sortBy } = req.query;

  const result = await Product.find({}, { min_sale: 0 })
    .populate("_pet _category _variant _country")
    .limit(LIMIT_PAGINATION);

  res.json(sort(result));
};

module.exports = getHomeProducts;
