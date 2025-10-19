import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  registerDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctorProfile,
} from "../controllers/doctorController.js";

const router = express.Router();

// Only doctors can create or update their profile
router.post("/register", protect, registerDoctor);
router.put("/update", protect, updateDoctorProfile);

// Patients can view doctors
router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);

export default router;
