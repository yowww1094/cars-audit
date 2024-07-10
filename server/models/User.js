import bcrypt from 'bcrypt';
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

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) next();

    const salt = await bcrypt.generateSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.isPasswordMatched = async function(entredPassword) {
    return await bcrypt.compare(entredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;