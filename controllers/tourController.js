const Tour = require('../models/tourModel');

exports.getAllTours = (req, res) => {
  // res.status(200).json({
  //   requestedAT: req.requestTime,
  //   status: 'succes',
  //   results: tours.length,
  //   body: {
  //     tours,
  //   },
  // });
};

exports.getTour = (req, res) => {
  // res.status(200).json({
  //   status: 'succes',
  //   body: {
  //     tour,
  //   },
  // });
};

exports.createTour = async (req, res) => {
  // const newTour = new Tour({});
  // newTour.save();
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: 'Invalid data sent',
    });
  }
};

exports.updateTour = (req, res) => {
  // res.status(200).json({
  //   status: 'success',
  //   body: {
  //     tour: 'Updated tour!',
  //   },
  // });
};

exports.deleteTour = (req, res) => {
  // res.status(204).json({
  //   status: 'success',
  //   body: null,
  // });
};
