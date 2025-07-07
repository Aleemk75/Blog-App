import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();
const secret = process.env.SECRET || 'secret';


export async function authValidation(req,res,next) {
    try{
        const headerToken = req.headers.authorization;
        const token = headerToken.split(" ")[1];
        let verify =  jwt.verify(token,secret);
        if(verify){
            let user = jwt.decode(token);
            req.id = user.data.id;
            next()
        } else{
            return res.status(401).send({message:"invalid token."})
        }
    }catch(e){
        return res.status(401).send({message:"invalid token"});
    }
}