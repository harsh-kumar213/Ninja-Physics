import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async()=>{
    try {
        console.log(process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to mongoDB");
    } catch (error) {
        console.log("error connecting to mongo db")
        console.log(error)
    }
}