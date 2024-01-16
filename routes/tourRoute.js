const express = require('express');

const tourControllers = require('../controllers/tourController');

const router = express.Router();

router
  .route('/top-5-cheap')
  .get(tourControllers.aliasTours, tourControllers.getAllTours);

router
  .route('/')
  .get(tourControllers.getAllTours)
  .post(tourControllers.createTour);

router
  .route('/:id')
  .get(tourControllers.getTour)
  .patch(tourControllers.updateTour)
  .delete(tourControllers.deleteTour);

module.exports = router;
