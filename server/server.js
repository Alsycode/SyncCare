import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import authRoutes from "./routes/authRoutes.js"
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/userRoutes.js"
dotenv.config()
const app = express();
app.use(cors());
app.use(express.json())
app.use(cookieParser());
mongoose.connect(process.env.MONGO_URI).then(()=>console.log("db connected")).catch(err=>console.error(err))
app.get('/', (req, res) => {
  res.send('API working');
});
app.use("/api/admin",authRoutes)
app.use("/api/user",userRoutes)
const port = 5000;
app.listen(port,()=>console.log(`Server runnin on ${port} succesfully`))