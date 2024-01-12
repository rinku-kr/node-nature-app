const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello world', app: 'Nature!' });
});

app.post('/', (req, res) => {
  res.send('This is post!');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
