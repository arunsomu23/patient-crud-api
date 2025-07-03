const PatientList = require('../models/PatientList');

// @desc    Get all patients
// @route   GET /api/patients
// @access  Protected (admin or user)
exports.getAllPatients = async (req, res, next) => {
  try {
    const patients = await PatientList.find();
    res.status(200).json(patients);
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single patient by ID
// @route   GET /api/patients/:id
// @access  Protected (admin or user)
exports.getPatientById = async (req, res, next) => {
  try {
    const patient = await PatientList.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'PatientList not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new patient
// @route   POST /api/patients
// @access  Admin only
exports.createPatient = async (req, res, next) => {
  try {
    const { name, age, diagnosis } = req.body;

    if (!name || !age || !diagnosis) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newPatient = new PatientList({
      name,
      age,
      diagnosis
    });

    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a patient
// @route   PUT /api/patients/:id
// @access  Admin only
exports.updatePatient = async (req, res, next) => {
  try {
    const updated = await PatientList.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({ message: 'PatientList not found' });
    }

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a patient
// @route   DELETE /api/patients/:id
// @access  Admin only
exports.deletePatient = async (req, res, next) => {
  try {
    const deleted = await PatientList.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'PatientList not found' });
    }

    res.status(200).json({ message: 'PatientList deleted successfully' });
  } catch (error) {
    next(error);
  }
};
