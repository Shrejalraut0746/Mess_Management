//importing router from express 
import {Router} from "express";

//import controler functions 
import { addPlan , getPlan , getAllPlan , updatePlan , deletePlan } from '../Controller/planController.js';

//creating router application for req and res 
const planRoute = Router();

// router queries
planRoute.post("/addPlan" , addPlan)
planRoute.get("/getPlan/:plan_type" ,  getPlan)
planRoute.get("/getAllPlan" ,  getAllPlan)
planRoute.patch("/updatePlan" , updatePlan)
planRoute.delete("/deletePlan" , deletePlan)



//export router application
export default planRoute;