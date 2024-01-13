const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json()); // Middleware, modify incoming request!

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'succes',
    results: tours.length,
    body: {
      tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid Id',
    });
  }

  res.status(200).json({
    status: 'succes',
    body: {
      tour,
    },
  });
});

app.post('/api/v1/tours/', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTours = Object.assign({ id: newId }, req.body);

  tours.push(newTours);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        body: {
          tour: newTours,
        },
      });
    }
  );
});

app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid Id',
    });
  }

  res.status(200).json({
    status: 'success',
    body: {
      tour: 'Updated tour!',
    },
  });
});

app.delete('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid Id',
    });
  }

  res.status(204).json({
    status: 'success',
    body: null,
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
