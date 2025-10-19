import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  bookAppointment,
  getMyAppointments,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/book", protect, bookAppointment);
router.get("/myappointments", protect, getMyAppointments);

export default router;
