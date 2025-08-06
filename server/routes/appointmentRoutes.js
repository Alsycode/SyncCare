import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';  // Adjust path as needed
import {
  createAppointment,
  getAppointments,
  updateInstructions,
} from '../controllers/Appointment.js';

const router = express.Router();

router.post('/', authMiddleware, createAppointment);
router.get('/', authMiddleware, getAppointments);
router.put('/:id/instructions', authMiddleware, updateInstructions);

export default router;
