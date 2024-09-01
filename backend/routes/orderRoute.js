import express from 'express'
import { listOrdersCtrl, placeOrderCtrl, updateStatusCtrl, userOrderCtrl, verifyOrderCtrl } from '../controllers/orderCtrl.js'
import authMiddleware from '../middlewares/auth.js'
const orderRouter= express.Router()

orderRouter.post('/place',authMiddleware,placeOrderCtrl)
orderRouter.post('/verify',verifyOrderCtrl)
orderRouter.post('/userorders',authMiddleware,userOrderCtrl)
orderRouter.get('/list',listOrdersCtrl)
orderRouter.post('/status',updateStatusCtrl)

export default orderRouter;