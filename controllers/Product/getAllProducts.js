const { Product } = require("../../models/product");
const { pagination, sortWeights } = require("../../helpers");

const getAllProducts = async (req, res) => {
  const { page = 1 } = req.query;

  const result = await pagination({
    Model: Product,
    page: Number(page),
    collectionLinks: ["_pet", "_category", "_variant", "_country"],
  });

  res.json({ ...result, docs: sortWeights(result.docs) });
};

module.exports = getAllProducts;
