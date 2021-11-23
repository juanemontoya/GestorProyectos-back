import mongoose from "mongoose";
import { ProjectModel } from "../proyecto/projecto.js";
import { UserModel } from "../usuario/usuario.js";

const { Schema, model } = mongoose;

/**** !!! IMPORTANTE!!! ****/

// 1. Definir el schema
// 2. Definir el modelo

const avanceSchema = new Schema({
    fecha:{
        type: Date,
        required: true,
    },
    descripcion:{
        type: String,
        required: true,
    },
    observaciones:[
        {
            type: String,
        },
    ],
    proyecto:{
        type: Schema.Types.ObjectId,
        ref: ProjectModel,
        required: true,
    },
    creadoPor:{
        type: Schema.Types.ObjectId,
        ref: UserModel,
        required: true,
    },
});

const ModeloAvance = model('Avance', avanceSchema);

export { ModeloAvance };