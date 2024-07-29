// importing router from express
import { Router } from "express";
import { getMenu , addMenu , updateMenu , deleteMenu} from "../Controller/menuController.js";

// importing controller functions

// create router application for taking and providing req and res
const menuRoute = Router();

// router queries
menuRoute.get("/getMenu/:menu_day" , getMenu)
menuRoute.post("/addMenu" , addMenu)
menuRoute.put("/updateMenu" , updateMenu)
menuRoute.delete("/deleteMenu" , deleteMenu)


// exporting router application
export default menuRoute;