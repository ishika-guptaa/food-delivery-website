import FoodModel from "../models/FoodModel.js";
import fs from 'fs'

//add new food item in db
export const addFoodCtrl = async (req, res) => {
    let image_filename = `${req.file.filename}`
    const food = new FoodModel({
        //we will send these data from frontend to backend
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    })
    try {
        await food.save() //save to database
        res.status(201).json({ success: true, message: "Food added successfully" })
    } catch (e) {
        console.log(e);
        res.status(500).json({ success: false, message: "Error" })
    }
}

// display list of all food item from db
export const listFoodCtrl = async (req, res) => {
    try {
        const foods = await FoodModel.find({}) //empty obj will list all food items
        res.status(200).json({ success: true, data: foods })
    } catch (e) {
        console.log(e);
        res.status(500).json({ success: false, message: "Error" })
    }
}

// remove food item from db
export const removeFoodCtrl = async (req, res) => {
    try {
        const food = await FoodModel.findById(req.body.id) //empty obj will list all food items
        fs.unlink(`uploads/${food.image}`, () => {}) //delete particular image from db
        await FoodModel.findByIdAndDelete(req.body.id) //delete food item
        res.status(201).json({ success: true, message: 'Food removed successfully' })
    } catch (e) {
        console.log(e);
        res.status(500).json({ success: false, message: "Error" })
    }
}