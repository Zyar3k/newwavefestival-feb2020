const express = require('express');
const router = express.Router();

const TestimonialController = require('../controllers/testimonials.controller');

router.get('/testimonials', TestimonialController.getAll);
router.get('/testimonials/:id', TestimonialController.getOne);
router.post('/testimonials', TestimonialController.postAll);
router.put('/testimonials/:id', TestimonialController.updateOne);
router.delete('/testimonials/:id', TestimonialController.deleteOne);

module.exports = router;