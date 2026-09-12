import mongoose from "mongoose"
import { config } from "./config.js"

export const connectDb = async ()=>{
    await mongoose.connect(config.MONGO_URL)    
    console.log("monngo SB connected sucessfully");
    
}