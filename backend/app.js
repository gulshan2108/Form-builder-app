import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import formRouter from "./routes/formRouter.js"


import dotenv from "dotenv"
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/v1',formRouter)


const PORT=process.env.PORT||8000
// connect mongo db atlas
mongoose.connect(process.env.MONGO_URL,{usenewurlparser:true,}).then(()=>{
    console.log("connected to mongodb atlas")
}).catch(error=>{
console.log("something wrong")
})

// server port
app.listen(PORT,()=>{
    console.log(`server start at port ${PORT}`);
})


