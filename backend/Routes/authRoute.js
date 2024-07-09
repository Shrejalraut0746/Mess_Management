import express from 'express';
import { Router } from 'express';
import {login} from '../Controller/authController.js';
const authRouter=Router();

authRouter.post("/login",login);

export default authRouter;