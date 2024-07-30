import moment from 'moment'
import mongoose from 'mongoose'
import validator from 'validator'
const { Schema } = mongoose;

const userplanSchema = new Schema({
    userId: {
        type: Number,
        required: [true, "please enter userId"]
    },
    subId: {
        type: Number,
        //required:[true,"please enter userId"]
    },
    planId: {
        type: Number,
        required: [true, "please enter planId"]
    },
    start_date: {
        type: Date,
    },
    end_date: {
        type: Date,
    },
    isAvailable: [
        {
            date: {
                type: Date,
                // required : true
            },
            breakfast: {
                type: Boolean,
                default: true
            },
            lunch: {
                type: Boolean,
                default: true
            },
            dinner: {
                type: Boolean,
                default: true
            },
        },
    ],
    remaining_days: {
        type: Number,
        // required:true
    },
    fees: {
        type: Number,
        required: [true, "please enter an password"]
    },
    fees_status: {
        type: Boolean,
        required: [true, "please enter an confirm password"],
        enum: [false, true],
        default: false
    },


}, { timestamps: true });

userplanSchema.pre("save", async function (next) {
    var docs = this;
    // console.log(docs);
    const data = await UserPlan.find();
    docs.subId = docs.subId + data.length;
    // const today_date = new Date();

    // const today = moment().utcOffset("+05:30").startOf('day').toDate()
    const today_date = moment().utcOffset("+5:30").add(1, 'days').startOf('day').toDate();
    console.log(today_date);
    var end_date = moment().utcOffset("+5:30").add(0, 'days').endOf('day').toDate();

    if (docs.planId === 501) {
        // end_date.setDate(end_date.getDate()+1)
        // const end_date = moment().utcOffset("+05:30").add(1,'days').endOf('day').toDate()
        
        // daily plan 
        end_date = moment(today_date)
        .utcOffset("+5:30")
        .add(0, "days")
        .endOf("day")
        .toDate();
    }
    else if(docs.planId===502){
        // end_date.setDate(end_date.getDate()+7)
        // const end_date = moment().utcOffset("+05:30").add(7,'days').endOf('day').toDate()

        // weekly plan
        end_date=moment(today_date)
        .utcOffset("+5:30")
        .add(6,"days")
        .endOf("day")
        .toDate();
    }
    else if(docs.planId===503){
         // end_date.setDate(end_date.getDate()+30)
         // const end_date = moment().utcOffset("+05:30").add(31,'days').endOf('day').toDate()

         //monthly plan
         end_date=moment(today_date)
         .utcOffset("+5:30")
         .add(29,"days")
         .endOf("day")
         .toDate();
    }

    var arr=getDatesInRange(new Date(today_date),new Date(end_date));
    function getDatesInRange(d1,d2){
        const date=new Date(d1);
        const dates=[];
        while(date<=d2){
            dates.push(new Date(date));
            date.setDate(date.getDate()+1);
        }
        return dates;
    }
    arr.map((item)=>{
         const availableObject={
             date:moment(item).utcOffset("+5:30").startOf("day").toDate(),
             breakfast:true,
             lunch:true,
             dinner:true
         };
         docs.isAvailable.push(availableObject);
    });
    docs.start_date=today_date;
    docs.end_date=end_date;
    docs.remaining_days=Math.round(
        moment.duration(moment(end_date).diff(moment(today_date))).asDays()
    );
    next();

});

const UserPlan=mongoose.models.userplan || mongoose.model("userplan",userplanSchema);
export default UserPlan;