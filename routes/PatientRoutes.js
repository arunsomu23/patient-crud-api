const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Patient = require('../models/Patient');

// Validation Rules
const validatePatient = [
  body('name').notEmpty().withMessage('Name is required'),
  body('age').optional().isInt({ min: 0 }).withMessage('Age must be a positive number'),
  body('gender').optional().isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender'),
  body('contact').optional().isString()
];

// Error Handling Middleware for Validation
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map(err => ({ field: err.param, msg: err.msg }));
    return res.status(400).json({ errors: extractedErrors });
  }
  next();
};

// CREATE
router.post('/', validatePatient, handleValidation, async (req, res, next) => {
  try {
    const patient = new Patient(req.body);
    const saved = await patient.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
});

// READ ALL
router.get('/', async (req, res, next) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    next(err);
  }
});

// READ ONE
router.get('/:id', async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    next(err);
  }
});

// UPDATE
router.put('/:id', validatePatient, handleValidation, async (req, res, next) => {
  try {
    const updated = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Patient not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Patient.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Patient not found' });
    res.json({ message: 'Patient deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
