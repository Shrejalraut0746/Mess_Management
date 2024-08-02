import {Router} from "express";
import { getDayMember, getPlanCount, getWeekProfit } from "../Controller/statisticalController.js";

const statisticsRoute=Router();
statisticsRoute.get("/getPlanCount",getPlanCount);
statisticsRoute.get("/getDaymember",getDayMember);
statisticsRoute.get("/getWeekProfit",getWeekProfit);

export default statisticsRoute;