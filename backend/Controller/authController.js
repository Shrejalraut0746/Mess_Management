import User from "../Models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

export const login = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

   if (!email || !password) {
      res.status(400).json({ message: 'All fields are required' });
   }
   const foundUser = await User.findOne({ 'email':email }).exec();
   if (!foundUser) {
      return res.status(401).json({ message: 'user not available' });
   }

   const matchpasswd = await bcrypt.compare(password, foundUser.password);
   if (!matchpasswd) {
      res.status(401).json({ message: 'Unauthorized' });

   }


   const accessToken = jwt.sign(
      {
         "UserInfo": {
            "name": foundUser.name,
            "email": foundUser.email,
            "role": foundUser.role,
            "mobileno": foundUser.mobileno
         }
      },
      process.env.AUTH_TOKEN,
      { expiresIn: '15m' }
   )

   const refreshToken = jwt.sign(
      { "email": foundUser.email },
      process.env.AUTH_TOKEN,
      { expiresIn: '7d' }
   )

   // Create secure cookie with refresh token 
   res.cookie('jwt', refreshToken, {
      httpOnly: true, //accessible only by web server 
      secure: false, //https
      sameSite: 'None', //cross-site cookie 
      maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
   })

   const { name, mobileno, role } = foundUser;
   // Send accessToken containing username and roles 
   res.json({ name, email, mobileno, role, accessToken });
})

export const refresh =asyncHandler( async (req, res) => {
   const cookies = req.cookies;
   if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized : no cookie store' })

   const refreshToken = cookies.jwt;
   jwt.verify(
      refreshToken,
      process.env.AUTH_TOKEN,
      asyncHandler(async (err, decoded) => {
         if (err) {
            return res.status(403).json({ message: 'Forbidden' });
         }

         const foundUser = await User.findOne({ email: decoded.email }).exec();
         if (!foundUser) {
            return res.status(401).json({ message: 'unauthorized: no user found' });
         }

         // decoding attributes
         const userId = foundUser.userId;
         const role = foundUser.role;
         const name = foundUser.name;
         const email = foundUser.email;
         const mobileno = foundUser.mobileno;

         const accessToken = jwt.sign(
            {
               "UserInfo": {
                  "email": email,
                  "role": role
               }
            },
            process.env.AUTH_TOKEN,
            { expiresIn: '15m' }

         )
         res.json({ userId, name, email, mobileno, role, accessToken });


      })
   )
}
)
export const logout= (req,res)=>{
      const cookies=req.cookies;
      if(!cookies?.jwt){
         return res.sendStatus(204);
      }
      res.clearCookie('jwt',{httpOnly:true,sameSite:'none',secure:false});
      res.json({message:'logout successfully'});
}

