import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);

// API test route returns JSON
app.get("/api/test", (_req, res) => {
  res.json({ success: true, message: "API test route working" });
});

// Root route returns JSON too (not plain text) to prevent JSON parse errors on client
app.get("/", (_req, res) => {
  res.json({ message: "API WORKING" });
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
