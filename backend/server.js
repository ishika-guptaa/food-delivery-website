import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import {connectDB} from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'


//app config
const app=express()
const port =process.env.PORT || 3000 //it will use the port available on the server

//middleware
//whenever we get req from frontend to backend that will be parsed using json
app.use(express.json())
//we can access backend from frontend
app.use(cors())

//db connection
connectDB()

//api endpoint
app.use('/api/food',foodRouter)
app.use('/images',express.static('uploads')) //to see images on frontend
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

//http method endpoint to req data from server
app.get('/', (req, res) => {
  res.send('API Working!')
})

//to run express server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
})
