const Thing = require('../models/Thing');
const fs = require('fs');

// Create one object
exports.createThing = (req, res, next) => {
    const thingObject = JSON.parse(req.body.thing); // Parse using JSON.parse to get a usable object
    delete thingObject._id; // Remove id from the request corp
    const thing = new Thing({
      ...thingObject,   //Spread syntax
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`  // Resolve image's path
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

// Edit object
exports.modifyThing = (req, res, next) => {
    const thingObject = req.file ?  // if req.file exists, process the new image
      {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body }; // else, process the incoming object

    Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };

// Delete object
exports.deleteThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })  // Find the object in the DB
        .then(thing => {
            const filename = thing.imageUrl.split('/images/')[1]; // When it is found, extract the name of the file
            fs.unlink(`images/${filename}`, () => { // Delete this file with fs.unlink          
                Thing.deleteOne({ _id: req.params.id })  // Delete object in the DB
                .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

// Collect one object
exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
    // If it's good, send to frontend
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
};

// Collect all object
exports.getAllThing = (req, res, next) => {
    Thing.find()
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
};