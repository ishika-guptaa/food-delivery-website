import mongoose from "mongoose";

export const connectDB=async ()=>{
  mongoose.connect('mongodb+srv://Ishika123:Ishika123@cluster0.uolzq.mongodb.net/food-delivery')
  .then(()=>console.log('DB Connected'))
  .catch((e)=>console.log('DB not connected',e))
}