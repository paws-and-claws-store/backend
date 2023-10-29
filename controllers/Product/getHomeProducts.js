const { Product } = require("../../models/product");
const { sortWeights, sort } = require("../../helpers");
const { LIMIT_PAGINATION } = require("../../config/consts");

const getHomeProducts = async (req, res) => {
  const { sortBy } = req.query;

  const result = await Product.find({ "items.count": { $gt: 0 } }, { min_sale: 0 })
    .populate("_pet _category _variant _country")
    .sort({ min_sale: 1 })
    .limit(LIMIT_PAGINATION);

  res.json(sort(sortWeights(result), sortBy));
};

module.exports = getHomeProducts;
