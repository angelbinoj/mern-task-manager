import express from'express';
import {getUser, UserRegister, UserLogin } from "../controllers/userController.js";
export const authRouter = express.Router();

//creating user authentication routes
authRouter.get('/users',getUser);
authRouter.post('/register',UserRegister);
authRouter.post('/login',UserLogin);