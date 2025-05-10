import express from "express";
import multer from "multer";
import { addFood, listFood , removeFood} from "../controllers/FoodController.js"; // Correct path

const foodRouter = express.Router();

// Multer configuration
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list" , listFood) 
foodRouter.post("/remove", removeFood);

export default foodRouter;
