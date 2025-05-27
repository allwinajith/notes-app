import express from "express";
import { updateUser } from "../controller/userController.js";
import { authMiddleware } from "../middleware/auth_mid.js";
const userRoute = express.Router()

userRoute.use(authMiddleware)

userRoute.put('/',updateUser)

export default userRoute;