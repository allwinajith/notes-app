import express from 'express'
import { userSignIn, userSignUp } from '../controller/onboardingUsrCntr.js'

const onBoardroute = express.Router()

onBoardroute.post("/register", userSignUp);
onBoardroute.post("/login", userSignIn);

export default onBoardroute;