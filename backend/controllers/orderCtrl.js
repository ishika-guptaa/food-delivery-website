import OrderModel from "../models/orderModel.js";
import UserModel from "../models/userModel.js";
import Stripe from 'stripe'

const stripe = new Stripe('sk_test_51PuAhNDmeWv6Hm2mVPkyDmrOzJ2mGn12wWnrAoqxr0z2AWGsCDMFdGOFFACzyefnw9Y21dQG2RB0g58CkxlJJjoh005BbKKnJP')
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//placing user order frm frontend
export const placeOrderCtrl=async (req,res)=>{
   
    const frontend_url=`http://localhost:5174`

   try {
      const newOrder= new OrderModel({
         userId:req.body.userId,
         items:req.body.items,
         amount:req.body.amount,
         address:req.body.address,
      })
      await newOrder.save()
      await UserModel.findByIdAndUpdate(req.body.userId,{cartData:{}}) //now clear the cart data after user place the order


    //create stripe payment link
    const line_items= req.body.items.map((item)=>({
         price_data:{
            currency:'aud',
            product_data:{
                name:item.name
            },
            unit_amount:item.price*100
         },
         quantity:item.quantity
    }))

    line_items.push({
        price_data:{
            currency:'aud',
            product_data:{
                name:'Delivery Charges'
            },
            unit_amount:2*100
         },
         quantity:1
    })

    // create session
    const session= await stripe.checkout.sessions.create({
        line_items:line_items,
        mode:'payment',
        success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    })
    
    res.json({success:true,session_url:session.url})
} catch (error) {
    console.log(error);
    res.json({success:false,message:`Stripe error ${error}`})    
   }
}

export const verifyOrderCtrl=async(req,res)=>{
    const {orderId, success} = req.body;
    try {
        if(success==='true'){
            await OrderModel.findByIdAndUpdate(orderId,{payment:true})
            res.json({success:true,message:'Paid'})
        }else{
            await OrderModel.findByIdAndDelete(orderId)
            res.json({success:false,message:'Not Paid'})
        }
    } catch (error) {
          console.log(error);          
        res.json({success:false,message:'Error'})
    }
}

//user order for frontend
export const userOrderCtrl=async(req,res)=>{
    try {
           const orders= await OrderModel.find({userId:req.body.userId})
           res.json({success:true,data:orders})
    } catch (error) {
          console.log(error);          
        res.json({success:false,message:'Error'})
    }
}

//listing order for admin panel
export const listOrdersCtrl=async(req,res)=>{
    try {
           const orders= await OrderModel.find({})
           res.json({success:true,data:orders})
    } catch (error) {
          console.log(error);          
        res.json({success:false,message:'Error'})
    }
}

//api for updating order status
export const updateStatusCtrl=async(req,res)=>{
    try {
            await OrderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
           res.json({success:true,message:"Status Updated"})
    } catch (error) {
          console.log(error);          
        res.json({success:false,message:'Error'})
    }
}

