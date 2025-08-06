import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import Admin from "../models/Admin.js";
import { generateAccessToken } from "../utils/createToken.js"
export const login = async (req,res) => {
    try{
const { email,password } = req.body;
if(!email || !password){
   res.json({success:false,message:"Invalid Credentials"});
    }
const admin = await Admin.findOne({email});
const isMatch = bcrypt.compareSync(password,admin.password)
if(!admin || !isMatch){
    res.json({success:false,message:"Invalid Credentials"});
}
const token  = jwt.sign({id:admin._id},process.env.JWT_SECRET,{expiresIn:"1hr"});

 res.cookie("accessToken", token, {
      httpOnly: true,
      secure: "None", // true in production, false in development
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });
res.status(200).json({token,success:true,user:{id:admin._id,email:admin.email}})
}catch{
        res.json({success:false,message:"Invalid Credentials"})
    }
}

export const checkCurrentUser = async (req,res) => {
    const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
    try{
const decoded = jwt.verify(token,process.env.JWT_SECRET);
const id = decoded.id;
const admin = await Admin.findById({id}).select(-password);
if(!admin){
    res.json({id:admin._id,email:admin.email})
}
     }catch{
        res.json({success:false,message:"No token available"})
    }
}

export const registerAdmin = async (req,res) => {
  try {
    const { email, password } = req.body;
    console.log("emailll",email)
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ email, password: hashedPassword, });
    await admin.save();
    const token = generateAccessToken({ id: admin._id});
    res.status(201).json({ token,message: 'Admin registered successfully', admin: { id: admin._id, email: admin.email } });
  } catch (error) {
    res.status(400).json({ message: 'Error registering admin' });
  }
};