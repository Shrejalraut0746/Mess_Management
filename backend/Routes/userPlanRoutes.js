import { Router } from "express";
import { getUserCurrentPlan ,getCurrentPlan,addUserPlan,updateUserPlan,updateConsent,getConsent,getUserTodayPlan,getTodayStudents} from "../Controller/userPlanController.js";
const userPlanRoute=Router();

userPlanRoute.get("/getusercurrentplan/:userId",getUserCurrentPlan);
userPlanRoute.get("/getcurrentplan",getCurrentPlan);
userPlanRoute.post("/adduserplan",addUserPlan);
userPlanRoute.patch("/updateuserplan",updateUserPlan);
userPlanRoute.patch("/updateconsent",updateConsent);
userPlanRoute.get("/getConsent/:obj",getConsent);
userPlanRoute.get("/getuserTodayPlan/:userId",getUserTodayPlan);
userPlanRoute.get("/getTodayStudents/:type",getTodayStudents);

export default userPlanRoute;
