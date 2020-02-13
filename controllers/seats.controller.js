const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  }
  catch(err) {
    res.status(500).json(err)
  }
};


exports.getOne = async (req, res) => {
  
  try {
    const sea = await Seat.findById(req.params.id);
    if(!sea) res.status(404).json({ message: 'Not found' });
    else res.json(sea);
  }
  catch(err) {
    res.status(500).json(err);
  }
  
};

exports.postAll = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const check = await Seat.findOne({ $and: [{ day: day }, { seat: seat }]})
    if (check) {
      res.json({message: 'Sorry, this seat is already taken'});
    } else {
      const newSeat = new Seat({day: day, seat: seat, client: client, email: email});
      await newSeat.save()
      res.json({message: 'OK'});
    }
    
  } catch (err) {
    res.status(500).json(err)
    
  }
  
};

exports.updateOne = async (req, res) => {
  
  try {
    const { day, seat, client, email } = req.body;
    const sea = await Seat.findById(req.params.id);
    if(!sea) {
      res.status(404).json({ message: 'Not found...' });
      
    }
    else {

      await Seat.updateOne({ _id: req.params.id }, { $set: { day:day, seat: seat, client: client, email: email }});
      res.json({ message: 'OK' });
    }
  }
  catch(err) {
    res.status(500).json(err);
  }
  
};

exports.deleteOne = async (req, res) => {

  try {
    const sea = await(Seat.findById(req.params.id));
    if(sea) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json(err);
  }
};