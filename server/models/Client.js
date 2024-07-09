import mongoose, { Schema } from "mongoose";

const clientSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    order:[{
        type: Schema.Types.ObjectId,
        ref: "Order"
    }]
});

const Client = mongoose.model("Client", clientSchema);
export default Client;