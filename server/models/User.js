import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true, 
        required:true,
        default: 'Admin'
    },
    username:{
        type:String,
        required:true,
        default: 'Admin'
    },
    password:{
        type:String,
        required:true
    },
    
},
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;