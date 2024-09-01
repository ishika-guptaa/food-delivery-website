import express from "express";
import { loginUserCtrl, registerUserCtrl } from "../controllers/userCtrl.js";

const userRouter= express.Router()

userRouter.post('/register',registerUserCtrl) 
userRouter.post('/login',loginUserCtrl) 




export default userRouter;
