const { Product } = require("../../models/product");
const { pagination, sort } = require("../../helpers");

const getAllProducts = async (req, res) => {
  const { page = 1, sortBy } = req.query;
  console.log("soaspaj", sortBy);

  const result = await pagination({
    Model: Product,
    page: Number(page),
    collectionLinks: ["_pet", "_category", "_variant", "_country"],
  });

  res.json({ ...result, docs: sort(result.docs, sortBy) });
};

module.exports = getAllProducts;
