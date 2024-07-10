import mongoose, { Schema } from "mongoose";
import mongooseSequence from "mongoose-sequence";

const orderSchema = mongoose.Schema({
    dateEntrer:{
        type:Date,
        required: true
    },
    dateSortie:{
        type:Date,
        required: true
    },
    blNumber:{
        type:String,
        required: true
    },
    brand:{
        type:Schema.Types.ObjectId,
        ref:"Brand",
        required: true
    },
    model:{
        type:Schema.Types.ObjectId,
        ref:"Model",
        required: true
    },
    matricule:{
        type:String,
        required: true
    },
    clientName:{
        type:String,
        required: true
    },
    clientPhone:{
        type:String,
        required: true
    },
    serviceType:{
        type:Schema.Types.ObjectId,
        ref:"Service",
        required: true
    },
    technicien:{
        type:String,
        required: true
    },
    price:{
        type:String,
        required: true
    },
    paidAmt:{
        type:String,
        required: true
    },
    seniorityCard:{
        type:Number,
        required: true
    },
    fidelity:{
        type:Number,
        required: true
    }
},
{
    timestamps: true
});

orderSchema.plugin(mongooseSequence(mongoose), { inc_field: 'orderId' });

const Order = mongoose.model("Order", orderSchema);
export default Order;