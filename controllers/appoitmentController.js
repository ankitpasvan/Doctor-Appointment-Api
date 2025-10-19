import Appointment from "..models/AppointmentModel.js";

// create appointment

export const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;
    const appointment = await Appointment.create({
      doctorId,
      patientId: req.user.id,
      date,
      time,
    });
    req.status(201).json({ message: "Appointment booked", appointment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get user appointment

export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patientId: req.user.id,
    }).populate("doctorId");
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
