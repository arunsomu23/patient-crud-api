const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const patientRoutes = require('./routes/PatientRoutes');
const authRoutes = require('./routes/authRoutes');
const PatientListRoutes = require('./routes/PatientListRoutes');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Patient CRUD API is running');
});


app.use('/api/patients', patientRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/patientList', PatientListRoutes);

// Error-handling middleware
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error(err));

  module.exports = app;
