import Blog from "../models/blogSchema.js";
import mongoose from "mongoose";
import { getcommentbyId } from "./comment.controller.js";
import { isValid, isValidBody } from "../middlewares/validateObjID.js"


export async function createBlog(req, res, next) {
    try {
        const data = req.body;
        if (!isValidBody(data)) return res.status(400).send({ message: "Please provide data to create blog" })

        const { title, description } = data;

        if (!title || !description) {
            return res.status(400).json({ message: "Please provide title/description" });
        }

        if (!isValid(title)) return res.status(400).send({ message: "Please enter a valid title" });
        if (!isValid(description)) return res.status(400).send({ message: "Please enter a valid description" });

        const newBlog = {
            title,
            description,
            owner: req.id,
            createdAt: Date.now(),
        };

        const blogSave = await Blog.create(newBlog);

        return res.status(201).json({
            success: true,
            message: "New blog created",
            data: blogSave,
        });
    } catch (error) {
        next(error);
    }
}
export async function getBlogById(req, res, next) {
    try {
        let id = req.params.id;
        let blogDetails = await Blog.findById(id);
        if (!blogDetails) {
            return res.status(404).send({ message: "Blog Not found!" })
        }
        let comments = await getcommentbyId(id)
        let data = {
            blog: blogDetails,
            comments: comments
        }

        return res.status(200).json({ data: data });

    } catch (e) {
        next(e);
    }
}

export async function showBlogs(req, res, next) {
    try {

        let allblogs = await Blog.find({});
        if (allblogs.length === 0) {
            return res.status(404).send({ message: "blogs not found" })
        }
        return res.status(200).send({ message: "success", blogs: allblogs });
    } catch (e) {
        next(e)
    }
}

export async function myBlogs(req, res, next) {
    try {
        let userId = req.id;
        let myBlogs = await Blog.find({ owner: userId });
        if (myBlogs.length === 0) {
            return res.status(404).send({ message: "blog not found" })
        }
        return res.status(200).send({ blogs: myBlogs })
    } catch (e) {
        next(e);
    }
}

export async function editMyBlog(req, res, next) {
    try {
        const data = req.body;
        if (!isValidBody(data)) return res.status(400).send({ message: "Please provide data to create blog" })

        let { title, description } = data;
        let blog = req.blog; //comes from middleware
        
        if (!isValid(title) && !blog.title) return res.status(400).send({ message: "Please enter a valid title" });
        if (!isValid(description) && !blog.description) return res.status(400).send({ message: "Please enter a valid description" });



        blog.title = title || blog.title;
        blog.description = description || blog.description;
        blog.updatedAt = Date.now();

        let updatedBlog = await blog.save();

        return res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            data: updatedBlog,
        });

    } catch (e) {
        next(e)
    }
}

export async function deleteMyBlog(req, res, next) {
    try {
        let blog = req.blog;
        await blog.deleteOne();
        return res.status(200).send({ message: "blog deleted successfully" })
    } catch (e) {
        next(e);
    }
}

