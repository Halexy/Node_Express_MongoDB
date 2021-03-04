const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

// Save data
router.post('/', stuffCtrl.createThing);
  
// Edit product
router.put('/:id', stuffCtrl.modifyThing);
  
// Delete product
router.delete('/:id', stuffCtrl.deleteThing);
  
// View specific product by id
router.get('/:id', stuffCtrl.getOneThing);
  
// View all products
router.get('/', stuffCtrl.getAllThing);
  
// Export router
module.exports = router;