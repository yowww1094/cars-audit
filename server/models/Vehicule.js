import mongoose, { Schema } from "mongoose";

const vehiculeSchema = mongoose.Schema({
    matricule:{
        type:String,
        required: true
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: "Brand"
    },
    model:{
        type: Schema.Types.ObjectId,
        ref: "Model"
    }
},
{
    timestamps: true
});

const Vehicule = mongoose.model("Vehicule", vehiculeSchema);
export default Vehicule;