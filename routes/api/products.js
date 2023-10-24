const { Router } = require("express");
const router = Router();

const ctrlProducts = require("../../controllers/products");

const { isValidId } = require("../../middlewares");

const ctlr = require("../../controllers/Product");

// Перелік продуктів на стартову сторінку
router.get("/", ctlr.getHomeProducts);

// Перелік всіх продуктів
router.get("/allItems", ctlr.getAllProducts);

// Перелік всіх продуктів, для тварин :idPet
router.get("/pets/:idPet", isValidId, ctlr.getProductsByPet);

// Перелік всіх продуктів, для тварин :idCategory
router.get("/categories/:idCategory", isValidId, ctlr.getProductsByCategory);

// Перелік всіх продуктів, для тварин :idVariant
router.get("/product_types/:idVariant", isValidId, ctlr.getProductsByTypeProduct);

// Повертає дані для одного продукту :idProduct
router.get("/:idProduct", isValidId, ctlr.getProductDetails);

router.get("/getProductByName/pets", ctlr.getProductByName);

module.exports = router;
