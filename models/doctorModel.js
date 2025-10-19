import mongoose from "mongoose";
const doctorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  specialization: String,
  experience: Number,
  availableSlots: [String],
});
export default mongoose.model("Doctor", doctorSchema);
