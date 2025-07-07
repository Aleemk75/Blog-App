
import Blog from "../models/blogSchema.js";
export const checkBlogOwnership = async (req,res,next)=>{
    const blog =  await Blog.findById(req.params.id);
    if(!blog){
        return res.status(404).send({message:"Blog Not Found!"});
    }

    if(!blog.owner.equals(req.id)){
        return res.status(403).send({message:"Not Authorized"})
    }
  req.blog = blog;  // attaching blog to request
  next();           // go to the route handler
}
