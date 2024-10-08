import DailyEntry from "../Models/DailyEntry.js";
import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';

export const getUserEntryDetail = asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).json({ message: 'userId required' });
    }

    const entry = await DailyEntry.findOne({ "userId": userId });

    // Check if entry is null or undefined
    if (!entry) {
        return res.status(404).json({ message: 'Entry not found' });
    }

    if (!entry.attendance || !entry.attendance.length) {
        return res.status(404).json({ message: 'No attendance data available' });
    }

    //console.log(entry.attendance[0].date);
    const start_date = entry.attendance[0].date.getDate();
    //console.log(entry.attendance[entry.attendance.length-1].date);
    const end_date = entry.attendance[entry.attendance.length - 1].date.getDate();
    // console.log(start_end , end_date);

    res.json({ entry, start_date, end_date });
});


export const updateDailyEntry = asyncHandler(async (req, res) => {
    const { userId, verifyThing, planId } = req.body
    if (!verifyThing) {
        return res.status(400).json({ message: "Select type required" });

    }
    // console.log(userId,verifyThing,planId);
    // Does the user exist to update?
    const user = await DailyEntry.findOne({ "userId": userId }).exec();
    if (!user) {
        return res.status(400).json({ message: "user not found" });
    }

    const date = new Date();
    console.log(user);
    const isTodayAdded = user.attendance.filter(item => {
        if (item.date.getDate() === date.getDate() && item.date.getMonth() === date.getMonth() && item.date.getFullYear() === date.getFullYear()) {
            return item;
        }
    });

    const length = isTodayAdded.length;
    var updatedObject = {};

    if (verifyThing === "breakfast") {
        updatedObject = { "breakfast": true, "lunch": length == 0 ? false : isTodayAdded[0].menu.lunch, "dinner": length == 0 ? false : isTodayAdded[0].menu.dinner };
    }
    else if (verifyThing === "lunch") {
        updatedObject = { "breakfast": length == 0 ? false : isTodayAdded[0].menu.breakfast, "lunch": true, "dinner": length == 0 ? false : isTodayAdded[0].menu.dinner };
    }
    else if (verifyThing === "dinner") {
        updatedObject = { "breakfast": length == 0 ? false : isTodayAdded[0].menu.breakfast, "lunch": length == 0 ? false : isTodayAdded[0].menu.lunch, "dinner": true };
    }
    else {
        return res.json({ message: "No verify thing is access" });
    }

    if (isTodayAdded.length === 1) {
        if ((verifyThing === "breakfast" && isTodayAdded[0].menu.breakfast) || (verifyThing === "lunch" && isTodayAdded[0].menu.lunch) || (verifyThing === "dinner" && isTodayAdded[0].menu.dinner)) {
            return res.status(400).json({ message: `your ${verifyThing} entry is already added` });
        }
        const updateEntry = await DailyEntry.updateOne({ "userId": userId }, {
            $set: {
                "attendance.$[elemX].menu": updatedObject
            }
        },
            {
                "arrayFilters": [{ "elemX.date": isTodayAdded[0].date }]
            }
        )
        return res.json({ message: `daily entry updated for ${verifyThing}` });
    }
    else {
        const today_date = new Date();
        // console.log(today_date);
        const dailyEntryObject = { "date": today_date, "currPlanId": planId, "menu": updatedObject };
        const updateEntry = await DailyEntry.updateOne({ "userId": userId }, {
            $push: {
                "attendance": dailyEntryObject
            }
        },)
        return res.json({message:`daily entry updated for ${verifyThing}`});
    }




})

// export const deleteUser = asyncHandler(async (req, res) => {
//     const { id } = req.body

//     // Confirm data
//     if (!id) {
//         return res.status(400).json({ message: 'User ID Required' })
//     }

//     // Does the user exist to delete?
//     const user = await User.findById(id).exec()

//     if (!user) {
//         return res.status(400).json({ message: 'User not found' })
//     }

//     const result = await user.deleteOne()

//     const reply = `Username ${result.email} with ID ${result._id} deleted`

//     res.json(reply)
// })