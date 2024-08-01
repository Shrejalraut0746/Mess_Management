// importing inventoryRoutes from express
import {Router} from "express";
import { addInventory , getAllUser , getStore , getInventory ,updateInventory, deleteInventory} from '../Controller/inventoryController.js';


//Importing controller functions
//create inventoryRoute application for taking and providing req and res

const inventoryRoute = Router();

//inventory routes queries
//inventoryRoute.get("/getusers" , getAllUser)
inventoryRoute.post("/addinventory" , addInventory)
inventoryRoute.get("/getstore/:storeType" , getStore)
inventoryRoute.get("/getinventory/:inventoryId" , getInventory )
inventoryRoute.patch("/updateinventory/:inventoryId" , updateInventory)
inventoryRoute.delete("/deleteinventory/:inventoryId" , deleteInventory)
// inventoryRoute.patch("/resetpasswd" , resetPassword)
// inventoryRoute.get("/verify" ,  d)

// exporting inventoryRoute application
export default inventoryRoute;