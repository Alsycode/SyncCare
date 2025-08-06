import Appointment from '../models/Appointment.js';

// Controller functions

export const createAppointment = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ message: 'Error scheduling appointment' });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patientId', 'name')
      .populate('doctorId', 'name specialization');
    res.json(appointments);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching appointments' });
  }
};

export const updateInstructions = async (req, res) => {
  try {
    const { instructions } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { instructions },
      { new: true }
    );
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ message: 'Error updating instructions' });
  }
};
