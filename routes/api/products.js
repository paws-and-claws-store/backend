const {Router} = require("express");
const router = Router();

const ctrlProducts = require('../../controllers/products');

// Перелік продуктів на стартову сторінку
router.get('/', ctrlProducts.getHomeProducts);

// Перелік всіх продуктів
router.get('/allItems', ctrlProducts.getAllProducts);

// Перелік всіх продуктів, для тварин :idPet
router.get('/pets/:idPet', ctrlProducts.getProductsByPet);

// Перелік всіх продуктів, для тварин :idCategory
router.get('/categories/:idCategory', ctrlProducts.getProductsByCategory);

// Перелік всіх продуктів, для тварин :idVariant
router.get('/product_types/:idVariant', ctrlProducts.getProductsByTypeProduct);

// Повертає дані для одного продукту :idProduct
router.get('/:idProduct', ctrlProducts.getProductDetails);

module.exports = router;
