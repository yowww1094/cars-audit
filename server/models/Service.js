import mongoose, { Schema } from "mongoose";

const serviceSchema = mongoose.Schema({
    serviceId: {
        type:String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    order: [{
        type: Schema.Types.ObjectId,
        ref: "Order"
    }]
},
{
    timestamps: true
});

const Service = mongoose.model("Service", serviceSchema);
export default Service;