import { Router } from "express"
import { login, logout, signUp } from "../controllers/userController.js";
import { auth } from "../middleware/auth.js";

export const userRouter = new Router();
userRouter.post("/signup",signUp );

userRouter.post("/login",login );

userRouter.post("/logout",auth, logout);

