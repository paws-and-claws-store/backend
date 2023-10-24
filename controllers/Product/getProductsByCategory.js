const { Product } = require("../../models/product");
const { pagination, sortWeights } = require("../../helpers");

const getProductsByCategory = async (req, res) => {
  const { page = 1 } = req.query;
  const { idCategory } = req.params;

  const result = await pagination({
    Model: Product,
    page: Number(page),
    filter: { _category: idCategory },
    collectionLinks: ["_pet", "_category", "_variant", "_country"],
  });

  res.json({ ...result, docs: sortWeights(result.docs) });
};

module.exports = getProductsByCategory;
