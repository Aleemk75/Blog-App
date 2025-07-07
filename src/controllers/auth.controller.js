import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();
const secret = process.env.SECRET || 'secret';
import User from "../models/userSchema.js";
import { isValid, isValidBody } from "../middlewares/validateObjID.js"

export async function signup(req, res, next) {
    try {
        const author = req.body;

        if (!isValidBody(author)) {
            return res.status(400).send({ message: "please provide Data" })
        }
        const { name, username, password, email } = author;

        if (!isValid(name)) return res.status(400).send({ message: "please enter a valid name" });

        if (!isValid(username)) return res.status(400).send({ message: "please enter a valid Username" });

        if (!isValid(password)) return res.status(400).send({ message: "password is required" });

        if (!isValid(email)) return res.status(400).send({ message: "email is required" });

        if (password.length < 4) {
            return res.status(400).send({ message: "Password must be at least 4 characters long" });
        }

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) return res.status(400).send({ mesaage: "email id is invalid!" });

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).send({ message: "Email or Username is already exist" })
        }

        const hashpassword = await bcrypt.hash(password, 10);

        let obj = {
            name: name,
            username: username,
            password: hashpassword,
            email: email,
            createdAt: Date.now(),
        }

        let newUser = await User.create(obj);
        if (newUser) {
            let data = {
                id: newUser._id,
                username: username,
                email: newUser.email,
            }

            let token = jwt.sign({ data }, secret, { expiresIn: '1h' });
            console.log(token);

            return res.status(201).json({ message: "user registered successfully", data: { username: newUser.username, Token: token } });
        }

        return res.status(400).send({ message: "user not saved" })
    } catch (e) {
        next(e);
    }
}

export async function login(req, res, next) {
    try {
        const author = req.body;
        if (!isValidBody(author)) return res.status(400).send({ message: "please provide credentials" });

        const { username, password } = author;

        if (!isValid(username)) return res.status(400).send({ message: "Please enter a valid Username" });
        if (!isValid(password)) return res.status(400).send({ message: "Password is required!" });

        const user = await User.findOne({ username: username });
        // console.log(user);

        if (!user) {
            return res.status(404).send({ message: "invalid username " })
        }

        if (await bcrypt.compare(password, user.password)) {
            let data = {
                id: user._id,
                username: username,
                email: user.email,
            }
            let token = jwt.sign({ data }, secret, { expiresIn: '1h' })
            console.log(token);

            res.status(200).json({ message: "user logged in successfully", data: { id: user._id, username: user.username, token: token } })
        } else {
            res.status(400).send({ message: "invalid Username or Password" })
        }
    } catch (e) {
        next(e)
    }
}