import mongoose from "mongoose";
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: "Blog"
    },
    createdAt: {
        type: Date,
        required:true
    }
});

const Comment = new mongoose.model("Comment", commentSchema);

export default Comment;