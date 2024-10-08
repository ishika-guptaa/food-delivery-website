import UserModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'


//login user
export const loginUserCtrl = async (req, res) => {
    const { email, password } = req.body;
    try {
        //checking user email exist or not
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "User does't exist" })
        }

        //checking user email exist or not
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Credentials" })
        }

        //generate token if both are true
        const token = createToken(user._id)
        res.json({ success: true, token })

    } catch (e) {
        console.log(e);
        res.json({ success: false, message:`Cant login ${e}` })
    }
}

//generate token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}
//register user
export const registerUserCtrl = async (req, res) => {
    const { name, password, email } = req.body
    try {
        //checking user already exist
        const exist = await UserModel.findOne({ email })
        if (exist) {
            return res.json({ success: false, message: 'User already exist' })
        }
        //validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please enter a valid email' })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: 'Please enter a strong password' })
        }

        //encrypt password or hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new UserModel({
            name: name,
            email: email,
            password: hashedPassword,
        })
        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({ success: true, token })

    } catch (e) {
        console.log(e);
        res.json({ success: false, message: 'Error' })
    }
}
