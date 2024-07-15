import mongoose, { Schema } from "mongoose";
import mongooseSequence from "mongoose-sequence";

const orderSchema = mongoose.Schema(
  {
    dateEntrer: {
      type: Date,
      required: [true, "Date d'entrer est obligatoire"],
    },
    dateSortie: {
      type: Date,
    },
    blNumber: {
      type: String,
      required: [true, "Numero de BL est obligatoire"],
    },
    brand: {
      type: String,
      required: [true, "Marque de voiture est obligatoire"],
    },
    matricule: {
      type: String,
      required: [true, "Matricule de voiture est obligatoire"],
    },
    clientName: {
      type: String,
      required: [true, "Nom de Client est obligatoire"],
    },
    clientPhone: {
      type: String,
    },
    serviceType: {
      type: String,
      required: [true, "Nature de Service est obligatoire"],
    },
    price: {
      type: String,
      required: [true, "Prix de service est obligatoire"],
    },
    paidAmt: {
      type: String,
    },
    technicien: {
      type: String,
    },
    seniorityCard: {
      type: String,
    },
    fidelity: {
      type: String,
    },
    reclamation: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

orderSchema.plugin(mongooseSequence(mongoose), { inc_field: "orderId" });

const Order = mongoose.model("Order", orderSchema);
export default Order;
