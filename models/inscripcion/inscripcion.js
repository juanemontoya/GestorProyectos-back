import mongoose from "mongoose";
import { ProjectModel } from "../proyecto/projecto.js";
import { UserModel } from "../usuario/usuario.js";

const { Schema, model } = mongoose;

/**** !!! IMPORTANTE!!! ****/

// 1. Definir el schema
// 2. Definir el modelo

const inscriptionSchema = new Schema({
    estado:{
        type: String,
        enum: ["ACEPTADO", "RECHAZADO", "PENDIENTE"],
        default: "PENDIENTE",
        required: true,
    },
    fechaIngreso:{
        type: Date,
        required: false,
    },
    fechaEgreso:{
        type: Date,
        required: false,
    },
    proyecto:{
        type: Schema.Types.ObjectId,
        ref: ProjectModel,
        required: true,
    },
    estudiante:{
        type: Schema.Types.ObjectId,
        ref: UserModel,
        required: true,
    },
});

inscriptionSchema.virtual("Proyecto", {
    ref: "Proyecto",
    localField: "_id",
    foreignField: "proyecto",
});

const InscriptionModel = model('Inscripcion', inscriptionSchema);

export { InscriptionModel };