const {Router} = require('express');
const router = Router();

const ctrlStructure = require('../../controllers/structure');

router.get('/pets', ctrlStructure.getPetsStructure);
router.get('/pets/:idPet/categories', ctrlStructure.getCategoriesStructure);
router.get('/pets/:idPet/categories/:idCategory/variants', ctrlStructure.getVariantsStructure);

module.exports = router;