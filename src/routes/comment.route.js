import express from "express"
const commentRouter = express.Router();
import {post,deleteComment} from "../controllers/comment.controller.js" 
import {validateObjectId} from "../middlewares/validateObjID.js"

commentRouter.post("/add-comment/:id", validateObjectId,post);
commentRouter.delete("/:id",validateObjectId, deleteComment);

export default commentRouter;