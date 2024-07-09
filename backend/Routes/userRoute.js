import express from "express";
import { Router } from "express";

// importing controller functions
import { getAllUser ,getOneUser,createNewUser,updateUser ,resetPassword,deleteUser} from "../Controller/userController.js";

// create router application for taking and providing req and res
const router=Router();

// router queries
router.get("/getusers",getAllUser);
router.get("/getuser/:email",getOneUser);
router.post("/signup",createNewUser);
router.patch("/update/:id",updateUser);
router.patch("/resetpasswd",resetPassword);
router.delete("/delete/:email" , deleteUser);

export default router;