import mongoose, { Schema } from "mongoose";

const brandSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true, 
        required:true,
    },
    models: [{
        type: Schema.Types.ObjectId,
        ref: 'Model'
    }]
},
{
    timestaps: true
});

const Brand = mongoose.model('Brand', brandSchema);
export default Brand;