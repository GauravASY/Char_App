import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    text : {
        type : String,
        required : true
        },

        users : {
            type : Array
        },
        
        sender : {
            type : String,
            required : true,
        }
    },
    {
        timestamps : true,
    }
    );

const Messages = mongoose.model("Messages", MessageSchema);

export default Messages;