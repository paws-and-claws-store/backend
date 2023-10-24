const { Product } = require("../../models/product");
const { sortWeights } = require("../../helpers");
const { LIMIT_PAGINATION } = require("../../config/consts");

const getHomeProducts = async (req, res) => {
  const result = await Product.find({}, { min_sale: 0 })
    .populate("_pet _category _variant _country")
    .sort({ min_sale: 1 })
    .limit(LIMIT_PAGINATION);

  res.json(sortWeights(result));
};

module.exports = getHomeProducts;
