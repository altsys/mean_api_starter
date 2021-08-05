import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name is required."
    },
    email: {
        type: String,
        required: "Email is required.",
        unique: true
    },
    password: {
        type: String,
        required: "Password is required."
    },
    role: {
        type: String,
        default: "User"
    }
})

const User = mongoose.model("User", userSchema);

export default User;