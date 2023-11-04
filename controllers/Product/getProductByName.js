const { Product } = require("../../models/product");
const { FindByNameOrBrandSchema } = require("../../models/product");
const { HttpError, pagination, sort, sortWeights } = require("../../helpers");

const getProductByName = async (req, res) => {
  const { findBy, page = 1, sortBy } = req.query;

  if (!findBy) {
    throw HttpError(400);
  }

  const toLowerCase = findBy.toLowerCase();

  const validationResult = FindByNameOrBrandSchema.validate(req.query);

  if (validationResult.error) {
    throw HttpError(400, validationResult.error);
  }

  const results = await pagination({
    Model: Product,
    page: Number(page),
    filter: {
      $or: [
        { productName: toLowerCase && new RegExp(toLowerCase, "i") },
        { brand: toLowerCase && new RegExp(toLowerCase, "i") },
        { shortDescription: toLowerCase && new RegExp(toLowerCase, "i") },
      ],
    },
    collectionLinks: ["_pet", "_category", "_variant", "_country"],
  });

  if (results.docs.length === 0) {
    throw HttpError(400, "Product not found");
  }

  res.json({
    code: 200,
    ...results,
    docs: sort(sortWeights(results.docs), sortBy),
  });
};

module.exports = getProductByName;
