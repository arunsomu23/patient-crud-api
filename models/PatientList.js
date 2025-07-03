const mongoose = require('mongoose');

const patientListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  diagnosis: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('PatientList', patientListSchema);
