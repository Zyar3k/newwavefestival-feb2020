const express = require('express');
const path = require('path');
const cors = require('cors');

const testimonialsRoutes = require('./routes/testimonials.routes');
const seatsRoutes = require('./routes/seats.routes');
const concertsRoutes = require('./routes/concerts.routes');

const app = express();

app.use(
  cors({ origin: 'http://localhost:3000', methods: 'GET, POST, PUT, DELETE' })
);
app.use(express.json());
app.use(cors());

app.use('/api', testimonialsRoutes);
app.use('/api', seatsRoutes);
app.use('/api', concertsRoutes);

app.use((req, res) => {
  res.status(404).send({message: '404 not found...'});
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});