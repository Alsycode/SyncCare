import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
dotenv.config()
const app = express();
app.use(cors());
app.use(express.json())

mongoose.connect(process.env.mongodb_uri,{newUrlParser:true,useUnifiedTopolgy:true}).then(()=>console.log("db connected")).catch(err=>console.error(err))
app.use("api/admin",adminRoutes)
const port = 5000;
app.listen(port,()=>console.log(`Server runnin on ${port} succesfully`))