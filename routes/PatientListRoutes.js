const express = require('express');
const patientController = require('../controllers/patientController');
const authorizeRole = require('../middlewares/authorizeRole');
const protect = require('../middlewares/authMiddleware')
const router = express.Router();

router.get('/', protect, patientController.getAllPatients);

// Only admins can create new patient records
router.post('/', protect, authorizeRole('admin'), patientController.createPatient);

module.exports = router;