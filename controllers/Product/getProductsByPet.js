const { Product } = require("../../models/product");
const { pagination, sortWeights } = require("../../helpers");

const getProductsByPet = async (req, res) => {
  const { page = 1 } = req.query;
  const { idPet } = req.params;

  const result = await pagination({
    Model: Product,
    page: Number(page),
    filter: { _pet: idPet },
    collectionLinks: ["_pet", "_category", "_variant", "_country"],
  });

  res.json({ ...result, docs: sortWeights(result.docs) });
};

module.exports = getProductsByPet;
