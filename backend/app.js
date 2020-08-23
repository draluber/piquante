const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Users = require('./models/users');
const Sauces = require('./models/sauces');

mongoose.connect('mongodb+srv://olivier:avenir@cluster0.4s4ii.mongodb.net/piquante?retryWrites=true&w=majority',
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

  app.post('/api/auth/signup', (req, res, next) => {
    const users = new Users({
      ...req.body
    });
    users.save()
      .then(() => res.status(201).json({ message: 'user enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  });

  app.post('/api/auth/login', (req, res, next) => {
    Users.find()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ error }));
    });

  app.post('/api/sauces', (req, res, next) => {
    delete req.body._id;
     

    const sauce = new Sauces({
    name : req.body.name,
    description : req.body.description,
    manufacturer : req.body.manufacturer,
    mainPepper : req.body.mainPepper,
    heat : req.body.heat,
    userId :'234',
    likes : 1,
    dislikes : 1,
    usersLiked : "2sdfs",
    usersDisliked : "fff" ,
    });
    console.log(sauce);
    sauce.save()
      .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
      .catch(error => res.status(400).json({ error }));
  });

module.exports = app;