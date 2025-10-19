import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" mongoDB connected Successfully");
  } catch (error) {
    console.log(error);
    console.log("mongoDB not connected");
    process.exit(1);
  }
};

export default connectDB;
