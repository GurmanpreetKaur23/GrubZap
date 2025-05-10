import foodModel from "../models/foodModel.js"; // Make sure the path is relative to this file

const addFood = async (req, res) => {
    const image_filename = req.file?.filename;

    if (!image_filename) {
        return res.status(400).json({ success: false, message: "Image upload failed" });
    }

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
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

export { addFood };
