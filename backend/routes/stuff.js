const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const stuffCtrl = require('../controllers/stuff');

// Save data
router.post('/', auth, stuffCtrl.createThing);
  
// Edit product
router.put('/:id', auth, stuffCtrl.modifyThing);
  
// Delete product
router.delete('/:id', auth, stuffCtrl.deleteThing);
  
// View specific product by id
router.get('/:id', auth, stuffCtrl.getOneThing);
  
// View all products
router.get('/', auth, stuffCtrl.getAllThing);
  
// Export router
module.exports = router;