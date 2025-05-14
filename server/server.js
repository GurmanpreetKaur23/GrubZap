import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js"; // Ensure .js extension is added
import foodRouter from "./routes/foodRoutes.js"; // Ensure .js extension is added
import userRouter from "./routes/userRoute.js"; // Ensure .js extension is added
import userModel from "./models/userModel.js"; // Ensure .js extension is added

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);

app.get("/", (_req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
