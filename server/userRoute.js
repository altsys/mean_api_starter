import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./models/UserModel.js"
import { errorResponse, notFoundResponse, successResponse } from "./utils/responseMessages.js";
import pagination from "./utils/pagination.js";

const router = express.Router();

//
router.post("/register", async (req, res)=> {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    });
    //TODO: validate for existing user.
    try {
        const regUser = await user.save();
        const token = jwt.sign({"_id":regUser._id, "email":regUser.email}, process.env.JWT_SECRET, {expiresIn: '30d'});
        res.status(201).header('authToken', token).json({ "message": "Successfully Signed in", "_id": regUser._id, "token": token });
        
    } catch (error) {
        errorResponse(res, error);
    }
});

//
router.post("/signin", async (req, res)=> {
    let user = await User.findOne({ email: req.body.email })
    try {
        if (!user) return notFoundResponse(res, user);
        const validated = await bcrypt.compareSync(req.body.password, user.password);
        if (!validated) return errorResponse(res, "", 400);
        const token = jwt.sign({"_id":user._id, "email":user.email}, process.env.JWT_SECRET, {expiresIn: '30d'});
        res.status(202).header('authToken', token).json({ "message": "Successfully Signed in", "_id": user._id, "token": token });
    } catch (error) {
        errorResponse(res, error);
    }
});

//Return current users profile.
router.post("/profile", async (req, res)=> {
    try {
        const user = await Users.findOne({ email: req.token });//TODO: How do I get the logged in user.
        notFoundResponse(res, user);
        successResponse(res, user);
    } catch (error) {
        errorResponse(res, error);
    }
});
//Find a user using id.
router.get("/:id", async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        notFoundResponse(res, user);
        successResponse(res, user);
    } catch (error) {
        errorResponse(res, error);
    }
});
//Return all users.
router.get("/", async (req, res) => {
    try {
        const {perpage, page, sortBy} = await pagination(req);
        const users = await User.find().limit(perpage)
        .skip(perpage * page).sort(sortBy);
        notFoundResponse(res, users);
        successResponse(res, users);
    } catch (error) {
        errorResponse(res, error);
    }
});

export default router;