const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  }
  catch(err) {
    res.status(500).json(err)
  }
};


exports.getOne = async (req, res) => {
  
  try {
    const con = await Concert.findById(req.params.id);
    if(!con) res.status(404).json({ message: 'Not found' });
    else res.json(con);
  }
  catch(err) {
    res.status(500).json(err);
  }
  
};

exports.postAll = async (req, res) => {

  try {

    const { id, performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({ id: id, performer: performer, genre: genre, price: price, day: day, image: image});
    await newConcert.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json(err);
  }
  
};

exports.updateOne = async (req, res) => {
  const { id, performer, genre, price, day, image } = req.body;

  try {
    const con = await(Concert.findById(req.params.id));
    if(con) {
      await Concert.updateOne({ _id: req.params.id }, { $set: { id: id, performer: performer, genre: genre, price: price, day: day, image: image }});
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json(err);
  }
  
};

exports.deleteOne = async (req, res) => {

  try {
    const con = await(Concert.findById(req.params.id));
    if(con) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json(err);
  }
};