const { Product } = require("../../models/product");
const { FindByNameOrBrandSchema } = require("../../models/product");
const { HttpError, pagination, sort, sortWeights } = require("../../helpers");

const test = async (req, res) => {
  const result = await Product.find();

  const results = await sort(result, "expensive");

  res.json({ results });
};

module.exports = test;
