import express from 'express';
import dotenv from 'dotenv';
import userRoute from './Routes/userRoute.js';
import authRouter from './Routes/authRoute.js';
import planRoute from './Routes/planRoute.js';
import dailyentryRouter from './Routes/dailyentryRoute.js';
import menuRoute from './Routes/menuRoutes.js'
import userPlanRoute from './Routes/userPlanRoutes.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { corsOptions } from './config/corsOptions.js';

dotenv.config();

// Import the Connection function from db_connect.js
import Connection from './database/db_connect.js';

// Initialize the Express app
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
// Connect to the database
Connection();

// Define the route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
