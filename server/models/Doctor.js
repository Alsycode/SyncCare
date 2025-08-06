import { timeStamp } from "console"
import mongoose from "mongoose"

const doctorSchema = new mongoose.Schema({
    name:{type:String,required:true},
    specialization:{type:String,reuired:true},
    email:{type:String,required:true,unique:true}
},{timeStamps:true})

export default mongoose.models("Doctor",doctorSchema)