const express = require('express');
const router = express.Router();

const ConcertController = require('../controllers/concerts.controller');

router.get('/concerts', ConcertController.getAll); 
router.get('/concerts/:id', ConcertController.getOne); 
router.post('/concerts', ConcertController.postAll); 
router.put('/concerts/:id', ConcertController.updateOne);
router.delete('/concerts/:id', ConcertController.deleteOne);

module.exports = router;