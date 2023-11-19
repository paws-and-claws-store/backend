const { Product } = require("../../models/product");
const { FindByNameOrBrandSchema } = require("../../models/product");
const { HttpError, pagination, sort, sortWeights } = require("../../helpers");
const lodash = require("lodash");

const getProductByName = async (req, res) => {
  const { findBy, page = 1, sortBy } = req.query;

  console.log(findBy);

  if (!findBy) {
    throw HttpError(400, "Query parameter 'findBy' is required");
  }

  // Розкодування параметра findBy
  const decodedFindBy = decodeURIComponent(findBy);

  const toLowerCase = lodash.toLower(decodedFindBy);
  console.log("toLowerCase:", toLowerCase);

  const validationResult = FindByNameOrBrandSchema.validate(req.query);

  if (validationResult.error) {
    throw HttpError(400, validationResult.error);
  }

  const results = await pagination({
    Model: Product,
    page: Number(page),
    filter: {
      $or: [
        { productName: toLowerCase && new RegExp(escapeRegExp(toLowerCase), "i") },
        { brand: toLowerCase && new RegExp(escapeRegExp(toLowerCase), "i") },
        { shortDescription: toLowerCase && new RegExp(escapeRegExp(toLowerCase), "i") },
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

// Додана функція для екранування символів у регулярному виразі
function escapeRegExp(string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
}

module.exports = getProductByName;
