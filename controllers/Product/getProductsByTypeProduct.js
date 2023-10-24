const { pagination, sortWeights } = require("../../helpers");
const { Product } = require("../../models/product");

const getProductsByTypeProduct = async (req, res) => {
  const { page = 1 } = req.query;
  const { idVariant } = req.params;

  const result = await pagination({
    Model: Product,
    page: Number(page),
    filter: { _variant: idVariant },
    collectionLinks: ["_pet", "_category", "_variant", "_country"],
  });

  res.json({ ...result, docs: sortWeights(result.docs) });
};

module.exports = getProductsByTypeProduct;
