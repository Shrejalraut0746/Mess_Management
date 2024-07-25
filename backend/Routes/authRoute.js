import express from 'express';
import { Router } from 'express';
import {login,refresh,logout} from '../Controller/authController.js';
const authRouter=Router();

authRouter.post("/login",login);
authRouter.get('/refresh',refresh);
authRouter.get('/logout',logout);

export default authRouter;