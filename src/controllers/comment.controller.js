import Blog from "../models/blogSchema.js";
import Comment from "../models/commentSchema.js";
import { isValid, isValidBody } from "../middlewares/validateObjID.js"

export async function post(req, res, next) {
    try {
         
        let { text } = req.body;
        if (!isValidBody(req.body)) return res.status(400).send({ message: "please provide data" });

        let blogId = req.params.id;
        if (!blogId) {
            return res.status(400).send({ message: "blogID must be provided" })
        }
        let userId = req.id;
        if (!userId) {
            return res.status(400).send({ message: "user must be provided" })
        }

        if (!text) {
            return res.status(400).send({ message: "Please enter your text " })
        }

        let comment = {
            text: text,
            user: userId,
            blogId: blogId,
            createdAt: Date.now()
        }

        let newComment = await Comment.create(comment);
        if (newComment) {
            return res.status(200).send({ message: "Comment Added!" , data: newComment});
        } else {
            return res.status(400).send({ message: "Comment not Added!" })
        }

    } catch (e) {
        next(e);
    }
}

export async function getcommentbyId(id) {
    try {
        let comments = await Comment.find({ blogId: id }).select("text");
        console.log(comments);
        return comments;
    } catch (e) {
        next(e)
    }
}

export async function deleteComment(req, res, next) {
    try {
        let id = req.params.id;
        let comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).send({ message: "comment Not found!" })
        }
        if (!comment.user.equals(req.id)) {
            return res.status(403).send({ message: "Not Authorized to delete this Comment" })
        } else {
            await comment.deleteOne();
            return res.status(200).send({ message: "Comment deleted!" });
        }

    } catch (e) {
        next(e);
    }
}