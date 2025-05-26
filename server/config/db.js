import mongoose from "mongoose";

const connectDB = async () => {
  try {
      const con = await mongoose.connect(process.env.MONGO_URI);
      console.log("Database Connected: ", con.connection.host);
  } catch (error) {
      console.error("Connection Failed : ", error)
  }
};

export default connectDB;