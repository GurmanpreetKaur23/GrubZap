import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "../server/config/db.js";
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

app.get("/", (_req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});

export default app;
