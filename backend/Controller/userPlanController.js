import UserPlan from "../Models/UserPlan.js";
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt';
import moment from "moment";
import { useAsyncError } from "react-router-dom";

export const getUserCurrentPlan = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    console.log(userId);
    const today_date = moment()
        .utcOffset("+5:30")
        .add(1, "days")
        .startOf("day")
        .toDate();

    console.log(today_date);
    const user = await UserPlan.find({
        userId: userId,
        start_date: { $lte: today_date },
        end_date: { $gte: today_date }
    });
    if (!user) {
        return res.status(400).json(user);
    }
    res.json(user[0]);
});

export const getCurrentPlan = asyncHandler(async (req, res) => {
    const today_date = new Date();
    const user = await UserPlan.aggregate([
        {
            $group: {
                _id: "$_id",
                userId: { $first: "$userId" },
                planId: { $first: "$planId" },
                start_date: { $first: "$start_date" },
                end_date: { $first: "$end_date" },
                fees_status: { $first: "$fees_status" }
            },

        },
        {
            $sort: {
                userId: 1
            },
        },
    ]);
    if (!user) {
        return res.status(400).json({ message: "no users found" });
    }
    return res.json(user);
});

export const addUserPlan = asyncHandler(async (req, res) => {
    const { userId, planId, fees } = req.body;

    const userPlanObject = {
        userId,
        planId,
        fees,
        fees_status: false, // Default to false until the fee is paid
        isAvailable: [], // Initialize isAvailable to an empty array
        createdAt: new Date(),
        updatedAt: new Date(),
        start_date: new Date(),
        end_date: new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000)), // Set end_date to 7 days from now
        remaining_days: 7 // Set remaining_days to 7
    };
    // Create and store new user
    const userplan = await UserPlan.create(userPlanObject);

    if (userplan) {
        return res.status(201).json({ message: `New user plan for user ${userId} created of plan ${planId}` });
    }
    else {
        return res.status(400).json({ message: "Invalid user data received" });
    }
});

export const updateUserPlan = asyncHandler(async (req, res) => {
    const { userId, planId } = req.body;

    // Check if userId and planId are provided
    if (!userId || !planId) {
        return res.status(400).json({ message: "userId and planId are required" });
    }

    // Find and update the user plan
    const updatedUserPlan = await UserPlan.findOneAndUpdate(
        { userId, planId },
        { fees_status: true },
        { new: true } // This option returns the updated document
    ).exec();

    if (!updatedUserPlan) {
        return res.status(400).json({ message: "User plan not found" });
    }

    // Return a success message
    res.json({ message: `User ${updatedUserPlan.userId} fee status updated`, updatedUserPlan });

});
export const updateConsent = asyncHandler(async (req, res) => {
    var { userId, planId, date, breakfast, lunch, dinner } = req.body;
    var date = new Date(date);
    date = moment(date).utcOffset("+5:30").startOf("day").toDate();

    const updatedObject = { date, breakfast, lunch, dinner };
    const updateConsent = await UserPlan.updateOne(
        { userId, planId },
        {
            $set: {
                "isAvailable.$[elemX]": updatedObject
            },
        },
        {
            arrayFilters: [{ "elemX.date": date }],
        }
    );
    if (updateConsent.modifiedCount === 0) {
        return res.status(400).json({ message: "No consent updated. Check if the date is correct." });
    }
    console.log("updated", updateConsent);
    res.json({ message: `${userId} consent status updated` });
});

// export const deletUser=asyncHandler(async (req,res)=>{
//       const {email}=req.body;
//       if(!email){
//          return res.status(400).json({message:"userId or email required"});
//       }
//       const user=await User.findOne({email}).exec();
//       if(!user){
//          return res.status(400).json({message:"Invalid userId"});
//       }
//       const result=await User.deleteOne({email});
//       res.json("user deleted");
// })

export const getConsent = asyncHandler(async (req, res) => {
    var data = JSON.parse(req.params.obj);

    var date = data.date;
    var userId = data.userId;
    var planId = data.planId;
    date = moment(date).utcOffset("+5:30").startOf("day").toDate();
    console.log(date);

    const getConsent = await UserPlan.findOne(
        { userId, planId, "isAvailable.date": date },
        {
            _id: 0,
            isAvailable: { $elemMatch: { date: date } },
        }

    );
    console.log(getConsent);
    res.json(getConsent);
});

export const getUserTodayPlan = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const today_date =  moment().utcOffset("+5:30").startOf("day").toDate();

    const user = await UserPlan.find(
        {
            userId: userId,
            start_date: { $lte: today_date },
            end_date: { $gte: today_date },
            "isAvailable.date": today_date,
        },
        {
            _id: 0,
            userId: 1,
            planId: 1,
            fees: 1,
            fees_status: 1,
            isAvailable: { $elemMatch: { date: today_date } }
        }
    );
    if (!user || user.length === 0) {
        return res.status(400).json({ message: "no userplan found" });
    }
    res.json(user);
});

export const getTodayStudents = asyncHandler(async (req, res) => {
    const type = req.params.type;

    var today_date = new Date();
    today_date = moment(today_date).utcOffset("+5:30").startOf("day").toDate();

    var user;
    if (type === "breakfast") {
        user = await UserPlan.aggregate([
            {
                $match: {
                    start_date: { $lte: today_date },
                    end_date: { $gte: today_date },
                    isAvailable: {
                        $elemMatch: {
                            date: today_date,
                            breakfast: true
                        },
                    },
                },
            },
            {
                $group: {
                    _id: "$_id",
                    userId: { $first: "$userId" },
                    planId: { $first: "$planId" },
                    fees_status: { $first: "$fees_status" },
                },
            },
            {
                $sort: { userId: 1 },
            },
        ]);
    }
    if (type === "lunch") {
        user = await UserPlan.aggregate([
            {
                $match: {
                    start_date: { $lte: today_date },
                    end_date: { $gte: today_date },
                    isAvailable:{
                        $elemMatch:{
                            date:today_date,
                            lunch:true
                        },
                    },
                },
            },
            {
                $group:{
                    _id:"$_id",
                    userId:{$first:"$userId"},
                    planId:{$first:"$planId"},
                    fees_status:{$first:"$fees_status"}
                },
            },
            {
                $sort:{userId:1},
            },
        ]);
    }
    if(type==="dinner"){
        user=await UserPlan.aggregate([
            {
                $match:{
                    start_date:{$lte:today_date},
                    end_date:{$gte:today_date},
                    isAvailable:{
                        $elemMatch:{
                            date:today_date,
                            dinner:true
                        },
                    },
                },
            },
            {
                $group:{
                    _id:"$_id",
                    userId:{$first:"$userId"},
                    planId:{$first:"$planId"},
                    fees_status:{$first:"$fees_status"}
                },
            },
            {
                $sort:{userId:1}
            },
        ]);
    }
    if(!user){
        return res.status(400).json({message:"no users found"});
    }
    res.json(user);

});