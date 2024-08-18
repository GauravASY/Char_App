import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String, 
        required : true,
        unique : true
    },

    email: {
        type :String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true
    },
    avatar : {
        type : String,
        default : ""
    },

    isAvatarSet : {
        type : Boolean,
        default : false,
    }
});

export const Users = mongoose.model("users", userSchema);
