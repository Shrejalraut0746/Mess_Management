import DailyEntry from "../Models/DailyEntry.js";
import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';

export const getUserEntryDetail=asyncHandler(async (req,res)=>{
    const userId=req.params.userId;
    if(!userId){
        return res.status(400).json({message:'userId required'});
    }

    const entry=await DailyEntry.findOne({"userId":userId});

    // Check if entry is null or undefined
    if(!entry){
        return res.status(404).json({ message: 'Entry not found'});
    }

    if (!entry.attendance || !entry.attendance.length) {
        return res.status(404).json({ message: 'No attendance data available' });
    }
    
    //console.log(entry.attendance[0].date);
    const start_date=entry.attendance[0].date.getDate();
    //console.log(entry.attendance[entry.attendance.length-1].date);
    const end_date=entry.attendance[entry.attendance.length-1].date.getDate();
    // console.log(start_end , end_date);

    res.json({entry,start_date,end_date});
});



