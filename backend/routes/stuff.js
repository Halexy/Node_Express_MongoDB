const express = require('express');

const router = express.Router();

const Thing = require('../models/thing');


// Save data
router.post('/', (req, res, next) => {
    delete req.body._id; //Remove id from the request corp
    const thing = new Thing({
      //Spread syntax
      ...req.body
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  });
  
// Edit product
router.put('/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});
  
// Delete product
router.delete('/:id', (req, res, next) => {
    Thing.deleteOne({ _id:req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});
  
// View specific product by id
router.get('/:id', (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
    // If it's good, send to frontend
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});
  
// View all products
router.get('/', (req, res, next) => {
    Thing.find()
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});
  
// Export router
module.exports = router;