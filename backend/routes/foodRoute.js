import express from "express";
import { addFoodCtrl, listFoodCtrl, removeFoodCtrl } from "../controllers/foodCtrl.js";
import multer from "multer";  //create image storage system

const foodRouter= express.Router()

//image storage engine
//whenever we upload any image it will save to uploads
const storage= multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})
const upload= multer({storage:storage})

foodRouter.post('/add',upload.single('image'),addFoodCtrl) //body form name will be image
foodRouter.get('/list',listFoodCtrl) 
foodRouter.post('/remove',removeFoodCtrl) 




export default foodRouter;
