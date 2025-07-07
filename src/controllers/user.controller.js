import mongoose from "mongoose";
import User from "../models/userSchema.js";
import bcrypt from "bcrypt"
import { isValid, isValidBody } from "../middlewares/validateObjID.js"

export async function allUsers(req, res) {
    let users = await User.find()
    console.log(users);
    if (!users) {
        return res.status(404).send({ message: "users not found" })
    }
    res.status(200).send({ users: users });
}


export async function updateUser(req, res, next) {
    try {
        const data = req.body;
        if (!isValidBody(data)) return res.status(400).send({ message: "Please provide valid data" });

        let { name, username, email, password } = data;

        let userID = req.params.id;
        let userIdToken = req.id;

        let user = await User.findById(userID);
        if (!user) {
            return res.status(404).send({ message: "user not found" })
        }

        if (!isValid(name) && !user.name) return res.status(400).send({ message: "please enter a valid name" });

        if (!isValid(username) && !user.username) return res.status(400).send({ message: "please enter a valid Username" });

        if (!isValid(password) && !user.password) return res.status(400).send({ message: "password is required" });

        if (!isValid(email) && !user.email) return res.status(400).send({ message: "email is required" });


        if (password && password.length < 4) {
            return res.status(400).send({ message: "Password must be at least 4 characters long" });
        }

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email || user.email))) return res.status(400).send({ mesaage: "email id is invalid!" });

        if (username && username !== user.username) {
            const existingUsername = await User.findOne({ username });
            if (existingUsername && existingUsername._id.toString() !== userID) {
                return res.status(400).send({ message: "Username is already in use" });
            }
        }

        if (email && email !== user.email) {
            const existingEmail = await User.findOne({ email });
            if (existingEmail && existingEmail._id.toString() !== userID) {
                return res.status(400).send({ message: "Email is already in use" });
            }
        }

        let hashpassword = password ? await bcrypt.hash(password, 10) : user.password;

        if (userIdToken !== user._id.toString()) {
            return res.status(401).send({ message: "not authorized" })
        }
        let obj = {
            name: name || user.name,
            username: username || user.username,
            password: hashpassword || user.password,
            email: email || user.email,
            updatedAt: Date.now(),
        }

        let updateUser = await User.findByIdAndUpdate(userID, obj);
        // console.log(updateUser);
        return res.status(200).json({ message: "user updated successfully", user: updateUser })
    } catch (e) {
        next(e);
    }
}