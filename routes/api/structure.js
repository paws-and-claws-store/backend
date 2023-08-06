const {Router} = require('express');
const router = Router();

const ctrlStructure = require('../../controllers/structure');

router.get('/pets', ctrlStructure.getPetsStructure);
router.get('/pets/:idPet/categories', ctrlStructure.getCategoryStructure);
router.get('/pets/:idPet/categories/:idCategory/variants', ctrlStructure.getVariantStructure);

module.exports = router;