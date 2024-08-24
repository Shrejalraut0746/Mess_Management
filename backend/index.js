import express from 'express';
import dotenv from 'dotenv';
import userRoute from './Routes/userRoute.js';
import authRouter from './Routes/authRoute.js';
import planRoute from './Routes/planRoute.js';
import dailyentryRouter from './Routes/dailyentryRoute.js';
import menuRoute from './Routes/menuRoutes.js'
import userPlanRoute from './Routes/userPlanRoutes.js';
import inventoryRoute from './Routes/inventoryRoutes.js';
import statisticsRoute from './Routes/statisticsRoute.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { corsOptions } from './config/corsOptions.js';

dotenv.config();

// Import the Connection function from db_connect.js
import Connection from './database/db_connect.js';
import UserPlan from './Models/UserPlan.js';
import moment from 'moment';
// Initializes the Express app
const app = express();
const PORT= 4000

// giving all permissions
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
// app.use(bodyParser.urlencoded({extended : true}))
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/users",userRoute);
app.use("/auth",authRouter);
app.use("/dailyentry",dailyentryRouter);
app.use("/menu", menuRoute)
app.use("/plan",planRoute)
app.use("/userplan",userPlanRoute);
app.use("/inventory" , inventoryRoute);
app.use("/stats",statisticsRoute);
// Connect to the database
Connection();

// Define the route
app.get("/" , async (req,res) => {

  const today_date = moment().utcOffset("+05:30").startOf('month').toDate()
  const end_date1 = moment().utcOffset("+05:30").endOf('month').toDate()
  const users = await Inventory.aggregate([
      {
          $match:
          {
            "date" : {$gte : today_date ,$lte : end_date1}
          }
      },

      {
        $group : 
        {
          _id: "$storeType",
          Expense : { $sum : '$sub_total'}
        }
      },

      ]
      )

    res.send(users)
})

app.get("/date" , async (req,res) => {

  const today_date = moment().utcOffset("+05:30").startOf('week').toDate()
  const end_date1 = moment().utcOffset("+05:30").endOf('week').toDate()
  console.log(today_date);
  console.log(end_date1);

  const user = await UserPlan.aggregate(
      [{
          $match : {
              "start_date":{$gte:today_date , $lte:end_date1},
              // "end_date":{$gte:today_date},
          }
      },
      {
          $group: {
              _id: "$start_date",
              totalamount: { $sum: "$fees" }
           }
      }
  ]
      )
      function groupBy(objectArray, property) {
          return objectArray.reduce(function (acc, obj) {
            var key = obj[property];
            key = moment(key).startOf('date').get('date')
          //   console.log(obj);
            if (!acc[key]) {
              acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
          }, {});
        }
        
      var groupedPeople = groupBy(user, '_id');
      groupedPeople  = Object.entries(groupedPeople).map(entry => {
          return {"date": entry[0],"amount": entry[1][0].totalamount};
          // console.log(entry[1][0]);
        });
      res.json(groupedPeople)
})


// Start the server
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
