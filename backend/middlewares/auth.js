//when user send data, use token to authenticate them
//this middleware is to decode the token
//take token from user using header
//destructure token from req.header

//this middleware will take the token and convert it into user id and using that user id, we can add, romove data from cart

import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {
    const {token} = req.headers //take token from user using header
    if(!token){
        return res.json({success:false, message:'Not Authorized, login again'})
    }
    
    //decode token
    try {
        //while creating token, we passed the userID
        //now we will get the userId while decoding the token
        const token_decode= jwt.verify(token,process.env.JWT_SECRET) 
        req.body.userId= token_decode.id
        next()
        
    } catch (e) {
        console.log(e);
        res.json({success:false, message:'Error'})
    }
}

export default authMiddleware