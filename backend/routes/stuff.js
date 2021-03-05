const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/stuff');


// View all products
router.get('/', auth, stuffCtrl.getAllThing);

// Save data
router.post('/', auth, multer, stuffCtrl.createThing);
  
// Edit product
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
  
// Delete product
router.delete('/:id', auth, stuffCtrl.deleteThing);
  
// View specific product by id
router.get('/:id', auth, stuffCtrl.getOneThing);
  
// Export router
module.exports = router;