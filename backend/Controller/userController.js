import User from '../Models/User.js';
import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';

export const getAllUser = asyncHandler(async (req, res) => {
    const users = await User.find({}, { password: 0, cpassword: 0 }).lean()
    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'no users found' });
    }
    res.json(users);
});

export const getOneUser = asyncHandler(async (req, res) => {
    const email = req.params.email;
    if (!email) {
        return res.status(400).json({ message: 'userId required' })
    }
    const user = await User.findOne({ "email": email }, { password: 0, cpassword: 0 }).lean();
    if (!user) {
        return res.status(400).json({ message: 'user not found' });
    }
    res.json(user);
})

export const getUser = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).json({ message: 'userId required' });
    }

    const user = User.findOne({ "userId": userId }, { password: 0, cpassword: 0 }).lean();
    if (!user) {
        return res.status(400).json({ message: 'user not found' });

    }
    res.json(user);
})

export const createNewUser = asyncHandler(async (req, res) => {
    // read data from req body
    const { name, email, mobileno, role, password, cpassword } = req.body;
    
    //duplicate entry
    const duplicate=await User.findOne({email}).lean().exec();

    if(duplicate){
        return res.status(409).json({message:'Duplicate username'});

    }

    // password and confirm password match
    const pwdIscpwd= password!==cpassword;
    if(pwdIscpwd){
        return res.status(409).json({message:'Confirm password does not match with password'});
    }
    
    //hashing password
    const salt=await bcrypt.genSalt();
    const hashedPassword=await bcrypt.hash(password,salt);

    const lastUser = await User.findOne().sort({ userId: -1 }).exec();
    const newUserId = lastUser ? lastUser.userId + 1 : 1;
    //creating userObject
    const userObject={userId: newUserId,name, email, mobileno, role, "password":hashedPassword, "cpassword":hashedPassword };

    // Create and store new user 
    const user=await new User(userObject).save();

    if(user){
        return res.status(201).json({message:`New user ${email} created`});
    }
    else{
        return res.status(400).send({message:'Invalid user data received'});
    }

});

export const updateUser = asyncHandler(async (req, res) => {
    const { name, email, mobileno, role } = req.body;
    const uid = parseInt(req.params.id, 10);

    if (isNaN(uid)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findOne({ userId: uid }).exec();
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const duplicateEmail = await User.findOne({ email }).lean().exec();
    const duplicateMobileno = await User.findOne({ mobileno }).lean().exec();

    if ((duplicateEmail && duplicateEmail._id.toString() !== user._id.toString()) ||
        (duplicateMobileno && duplicateMobileno._id.toString() !== user._id.toString())) {
        return res.status(409).json({ message: 'Duplicate email or mobile number' });
    }

    user.name = name;
    user.email = email;
    user.mobileno = mobileno;
    user.role = role;

    try {
        const updatedUser = await user.save();
        res.json({ message: `${email} updated` });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user' });
    }
});


export const resetPassword=asyncHandler(async (req,res)=>{
    // read data from req body
     const {email,oldpassword ,newpassword}=req.body

     // find user and match
     const foundUser= await User.findOne({"email":email}).exec();
     if(!foundUser){
        return res.status(401).json({message:'user not available'});
     }
     
     const matchPasswd=await bcrypt.compare(oldpassword,foundUser.password);
     if(!matchPasswd){
        return res.status(401).json({ message: 'Unauthorized' })
     }

     // hashing a password
     const salt=await bcrypt.genSalt();
     const hashedPassword=await bcrypt.hash(newpassword,salt);
     
     const userObject={"password":hashedPassword,"cpassword":hashedPassword};
     const resetPasswd=await User.updateOne({email},userObject);
     // console.log(resetPasswd);

     res.json({message:'password resetted'});

});

export const deleteUser=asyncHandler(async (req,res)=>{
     const email=req.params.email;

      // Confirm data
      if(!email){
          return res.status(400).json({message:'userId required'});
      }

       // Does the user exist to delete?
      const user=await User.findOne({email}).exec();

      if(!user){
        return res.status(400).json({message:'user not found'});
      }
      const result=await User.deleteOne({email});

      const reply= `username ${result.email} deleted`;
      res.json({message:reply});


});

