const { Product } = require("../../models/product");
const { pagination, sort } = require("../../helpers");

const getProductsByPet = async (req, res) => {
  const { page = 1, sortBy } = req.query;
  const { idPet } = req.params;

  const result = await pagination({
    Model: Product,
    page: Number(page),
    filter: { _pet: idPet },
    collectionLinks: ["_pet", "_category", "_variant", "_country"],
  });

  res.json({ ...result, docs: sort(result.docs, sortBy) });
};

module.exports = getProductsByPet;
