import foodModel from "../models/foodModel.js";
import fs from "fs";

export const addFood = async (req, res) => {
  console.log("req.file:", req.file);
  console.log("req.body:", req.body);

  const image_filename = req.file?.filename;

  if (!image_filename) {
    return res.status(400).json({ success: false, message: "Image upload failed" });
  }

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: parseFloat(req.body.price), // Convert string to number
    category: req.body.category,
    image: image_filename
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food item added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (!food) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }

    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) console.error("Image deletion error:", err);
    });

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
