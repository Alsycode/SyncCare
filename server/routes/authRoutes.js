import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'

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
const token  = jwt.sign({id:admin.id},process.env.JWT_SECRET,{expiresIn:"1hr"});
res.json({token,success:true,user:{id:admin._id,email:admin.email}})
}catch{
        res.json({success:false,message:"Invalid Credentials"})
    }
}

export const cehckCurrentUser = (req,res) => {
    const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
    try{
const decoded = jwt.verify(token,process.env.JWT_SECRET);
const admin = await Admin.findById({decoded?.id}).select(-password);
if(!admin){
    res.json({id:admin._id,email:admin.email})
}
     }catch{
        res.json({success:false,message:"No token available"})
    }
}