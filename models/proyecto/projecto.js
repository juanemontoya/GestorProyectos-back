import mongoose from "mongoose";
import { UserModel } from "../usuario/usuario.js";

const { Schema, model } = mongoose;

/**** !!! IMPORTANTE!!! ****/

// 1. Definir el schema
// 2. Definir el modelo

const projectSchema = new Schema({
    nombre:{
        type: String,
        required: true,
    },
    presupuesto:{
        type: Number,
        required: true,
    },
    fechaInicio:{
        type: Date,
        required: false,
    },
    fechaFin:{
        type: Date,
        required: false,
    },
    estado:{
        type: String,
        enum: ["ACTIVO", "INACTIVO"],
        default: "INACTIVO",
    },
    fase:{
        type: String,
        enum: ["INICIADO", "DESARROLLO", "TERMINADO", "NULO"],
        default: "NULO",
    },
    lider:{
        type: Schema.Types.ObjectId,
        // required: true,
        ref: UserModel, //Hace referencia al modelo usuarios al tener la relación entre las tablas
    },
    objetivos:[
        {
            descripcion:{
                type: String,
                required: true,
            },
            tipo:{
                type: String,
                enum: ["GENERAL", "ESPECIFICO"],
                required: true,
            },        
        },
    ],
},{
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
});

// projectSchema.virtual("avances", {
//     ref: "Avance",
//     localField: "_id",
//     foreignField: "proyecto",
// });

projectSchema.virtual("inscripciones", {
    ref: "Inscripcion",
    localField: "_id",
    foreignField: "proyecto",
});



const ProjectModel = model('Proyecto', projectSchema);

export {ProjectModel};