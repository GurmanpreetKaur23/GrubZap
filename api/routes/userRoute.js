import express from "express";
import { someUserControllerFunctions } from "../../server/controllers/userController.js";

const userRouter = express.Router();

// Define user routes here, example:
userRouter.get("/profile", someUserControllerFunctions.profile);

export default userRouter;
