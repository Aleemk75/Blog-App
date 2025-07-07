import express from "express"
import {dbConnect} from "./db/db.js"
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT;
import authRouter from "./routes/auth.route.js";
import {authValidation} from "./middlewares/user.auth.js"
import userRouter from "./routes/user.routes.js";
import blogRouter from "./routes/blog.routes.js";
import commentRouter from "./routes/comment.route.js";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnect()
.then(()=>{
    console.log("connected");
})
.catch((err)=>{
    console.log(err);
})


app.use("/auth",authRouter);

app.use(authValidation);

app.use("/user",userRouter);

app.use("/blog" , blogRouter);

app.use("/comment",commentRouter);

app.use((err, req, res, next) => {
    let { status = 500, message = "server error" } = err;
    res.status(status).send({message : message});
});

app.listen(port , ()=>{
    console.log("app is listening on port", port);
});