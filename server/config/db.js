import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect('mongodb+srv://grubzap:grubzapggg@cluster0.3mydztp.mongodb.net/GrubZap')
    .then(() => console.log("DB Connected"))
    .catch((err) => console.error("DB Connection Error: ", err));
};
