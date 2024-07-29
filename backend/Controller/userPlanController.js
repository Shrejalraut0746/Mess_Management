import UserPlan from "../Models/UserPlan.js";
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt';
import moment from "moment";

export const getUserCurrentPlan=asyncHandler(async (req,res)=>{
    const userId=req.params.userId;
    console.log(userId);
    const today_date=moment()
    .utcOffset("+5:30")
    .add(1,"days")
    .startOf("day")
    .toDate();

    console.log(today_date);
    const user=await UserPlan.find({
        userId:userId,
        start_date:{$lte:today_date},
        end_date:{$gte:today_date}
    });
    if(!user){
        return res.status(400).json(user);
    }
    res.json(user[0]);
});

