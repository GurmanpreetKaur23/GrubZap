import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "../server/config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoute.js";

dotenv.config();

import { createServer } from "http";
import { parse } from "url";
import next from "next";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "../server/config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoute.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);

app.get("/", (_req, res) => {
  res.send("API WORKING");
});

// Remove app.listen for serverless compatibility
// export default app;

export default app;
