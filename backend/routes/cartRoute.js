import express from 'express'
import { addToCartCtrl, removeFromCartCtrl, getCartCtrl } from '../controllers/cartCtrl.js'
import authMiddleware from '../middlewares/auth.js'

const cartRouter= express.Router()

cartRouter.post('/add',authMiddleware,addToCartCtrl)
cartRouter.post('/remove',authMiddleware,removeFromCartCtrl)
cartRouter.post('/get',authMiddleware,getCartCtrl)

export default cartRouter;