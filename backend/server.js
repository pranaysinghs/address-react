const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect('mongodb://localhost:27017/locationDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

const locationSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
  address: String,
});

const Location = mongoose.model('Location', locationSchema);

app.post('/save-location', async (req, res) => {
  const { lat, lng, address } = req.body;
  const newLocation = new Location({ lat, lng, address });
  await newLocation.save();
  res.json({ message: 'Location saved successfully!' });
});

app.get('/locations', async (req, res) => {
  const locations = await Location.find();
  res.json(locations);
});

app.listen(5000, () => console.log('Server running on port 5000'));
