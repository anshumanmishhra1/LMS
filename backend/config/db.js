import mongoose from "mongoose";
import { config} from "dotenv";

config();
export const connectDb = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Database connected')
    }catch(error){
        console.log(error);
        console.log('Sahi se connect krr bhai');   
    }
}