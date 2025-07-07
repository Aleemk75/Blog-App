import { createBlog, getBlogById, showBlogs, myBlogs, editMyBlog, deleteMyBlog } from "../controllers/blog.controlller.js";
import express from "express"
import { checkBlogOwnership } from "../middlewares/checkownership.js";
const blogRouter = express.Router();
import { validateObjectId } from "../middlewares/validateObjID.js"

blogRouter.post("/newblog", createBlog);
blogRouter.get("/allblogs", showBlogs);
blogRouter.get("/myblogs", myBlogs);

blogRouter.get("/:id",
    validateObjectId,
    getBlogById);
blogRouter.put("/:id",
    validateObjectId,
    checkBlogOwnership,
    editMyBlog);
blogRouter.delete("/:id",
    validateObjectId,
    checkBlogOwnership,
    deleteMyBlog);

export default blogRouter;
