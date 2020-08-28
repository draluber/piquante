const Sauces = require ('../models/Sauces');

exports.createSauce =  (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauces({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
      .catch(error => res.status(400).json({ error }));
  }

exports.modifySauce =  (req, res, next) => {
    const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body};
    Sauces.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'sauce modifiée' }))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce =  (req, res, next) => {
    Sauces.deleteOne({_id: req.params.id })
    .then(() => res.status(200).json({ message: 'sauce supprimée'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauces.findOne({_id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
  };

exports.getAllSauces =  (req, res, next) => {
    Sauces.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
  };

exports.likedislikeSauce = (req, res, next) => {
    if (req.body.like === 1){
      Sauces.updateOne({ _id: req.params.id },{ $inc: { likes: +1 }, $push: {usersLiked: req.body.userId} })
        .then(() => res.status(200).json({ message: 'likes + 1' }))
        .catch(error => res.status(400).json({ error }));
    }
    if (req.body.like === -1){
      Sauces.updateOne({ _id: req.params.id },{ $inc: { dislikes: +1 }, $push: {usersDisliked: req.body.userId} })
      .then(() => res.status(200).json({ message: 'dislikes + 1' }))
      .catch(error => res.status(400).json({ error }));
    }
    if (req.body.like === 0){
         Sauces.findOne({ _id: req.params.id })
          .then (sauce => {
              if (sauce.usersLiked.includes(req.body.userId)) {
                Sauces.updateOne({ _id: req.params.id },{ $inc: { likes: -1 }, $pull: {usersLiked: req.body.userId} })
                  .then(() => res.status(200).json({ message: 'likes - 1' }))
                  .catch(error => res.status(400).json({ error }));
              }
              if (sauce.usersDisliked.includes(req.body.userId)) {
                Sauces.updateOne({ _id: req.params.id },{ $inc: { dislikes: -1 }, $pull: {usersDisliked: req.body.userId} })
                  .then(() => res.status(200).json({ message: 'dislikes - 1' }))
                  .catch(error => res.status(400).json({ error }));
              }
          })
          .catch(error => res.status(400).json({ error }));
    }
  };