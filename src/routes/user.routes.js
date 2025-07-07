import express from "express"
import { allUsers , updateUser} from "../controllers/user.controller.js";
const userRouter = express.Router();
import {validateObjectId} from "../middlewares/validateObjID.js"

userRouter.get("/",allUsers);
userRouter.put("/:id",validateObjectId, updateUser);

export default userRouter;