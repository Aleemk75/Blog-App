import mongoose from "mongoose";
const Schema = mongoose.Schema;


const blogSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

const Blog = new mongoose.model("Blog", blogSchema);

export default Blog;