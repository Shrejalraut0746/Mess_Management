import { Router } from "express";
import { getUserCurrentPlan } from "../Controller/userPlanController.js";
const userPlanRoute=Router();

userPlanRoute.get("/getusercurrentplan/:userId",getUserCurrentPlan);

export default userPlanRoute;
