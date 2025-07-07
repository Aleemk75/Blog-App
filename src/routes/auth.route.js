import { signup,login } from "../controllers/auth.controller.js";

import express from "express"
const authRouter = express.Router();

 authRouter.post("/signup" , signup);
 authRouter.post("/login" , login);

 export default authRouter;