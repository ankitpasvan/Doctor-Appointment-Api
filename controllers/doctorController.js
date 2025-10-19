import Doctor from "../models/doctorModel.js";
import User from "../models/userModel.js";

// ✅ 1. Register doctor profile (after doctor signup)
export const registerDoctor = async (req, res) => {
  try {
    const { specialization, experience, availableSlots } = req.body;

    // userId from JWT token
    const userId = req.user.id;

    // check if user is a doctor
    const user = await User.findById(userId);
    if (user.role !== "doctor") {
      return res
        .status(403)
        .json({ message: "Only doctors can create profiles" });
    }

    const doctor = await Doctor.create({
      userId,
      specialization,
      experience,
      availableSlots,
    });

    res.status(201).json({
      message: "Doctor profile created successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ 2. Get all doctors (for patients to view)
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("userId", "name email");
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ 3. Get single doctor by ID
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate(
      "userId",
      "name email"
    );
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ 4. Update doctor profile (doctor himself)
export const updateDoctorProfile = async (req, res) => {
  try {
    const { specialization, experience, availableSlots } = req.body;
    const doctor = await Doctor.findOneAndUpdate(
      { userId: req.user.id },
      { specialization, experience, availableSlots },
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    res.json({ message: "Profile updated successfully", doctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
