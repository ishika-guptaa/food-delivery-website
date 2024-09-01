import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique:true
    },
    password: {
        type: String,
        require: true,
    },
    cartData: {
        type: Object,
        default:{}
    },
   },{minimize:false}) //because of empty object and it will not be created
//if model is there it will be used otherwise new model will be created
const UserModel=mongoose.models.user || mongoose.model('user',userSchema)
export default UserModel