import User from "../Models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

export const login=asyncHandler(async (req,res)=>{
     const {email,password}=req.body;

     if(!email || !password){
        res.status(400).json({message:'All fields are required'});
     }
     const foundUser=await User.findOne({'email':email}).exec();
     if(!foundUser){
        return res.status(401).json({message:'user not available'});
     }

     const matchpasswd=await bcrypt.compare(password,foundUser.password);
     if(!matchpasswd){
        res.status(401).json({message:'Unauthorized'});

     }
     

     const accessToken=jwt.sign(
        {
            UserInfo:{
                 name:foundUser.name,
                 email:foundUser.email,
                 role:foundUser.role,
                 mobileno:foundUser.mobileno
            }
        },
        process.env.AUTH_TOKEN,
            {expiresIn:'15m'}
     )

     const refreshToken=jwt.sign(
        {email:foundUser.email},
        process.env.AUTH_TOKEN,
        {expiresIn:'7d'}
     )

     // Create secure cookie with refresh token 
     res.cookie('jwt', refreshToken, {
        // httpOnly: true, //accessible only by web server 
        // secure: true, //https
        // sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })
    
    const {name,mobileno,role}=foundUser;
    // Send accessToken containing username and roles 
    res.json({name,email,mobileno,role,accessToken});
})


