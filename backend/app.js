const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Thing = require('./models/thing');

mongoose.connect('mongodb+srv://Halexy:nh3mG3k8@cluster0.ql2hd.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

// Save data
app.post('/api/stuff', (req, res, next) => {
  delete req.body._id; //Remove id from the request corp
  const thing = new Thing({
    //Spread syntax
    ...req.body
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

// View specific product by id
app.get('/api/stuff/:id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
  // If it's good, send to frontend
  .then(things => res.status(200).json(things))
  .catch(error => res.status(400).json({ error }));
});

// View all products
app.get('/api/stuff', (req, res, next) => {
  Thing.find()
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});

module.exports = app;