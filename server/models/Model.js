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
    },
    cars: [{
        type: Schema.Types.ObjectId,
        ref: 'Vehicule'
    }]
},
{
    timestamps: true
});

const Brand = mongoose.model('Brand', modelSchema);
export default Brand;