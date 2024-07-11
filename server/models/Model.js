import mongoose, { Schema } from "mongoose";

const modelSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true, 
        required:true,
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: "brand"
    }
},
{
    timestamps: true
});

const Model = mongoose.model("Model", modelSchema);
export default Model;