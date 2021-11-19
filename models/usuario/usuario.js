import mongoose from "mongoose";

const { Schema, model } = mongoose;

/**** !!! IMPORTANTE!!! ****/

// 1. Definir el schema
// 2. Definir el modelo

const userSchema = new Schema({

    correo: {
        type: String,
        required: true,
        unique: true,
        validate:{
            validator:(email)=>{
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },
            message:'El formato de correo electrónico digitado está erroneo',
        },
    },
    identificacion:{
        type: String,
        required: true,
        unique: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    rol:{
        type: String,
        required: true,
        enum: ["ESTUDIANTE", "LIDER", "ADMINISTRADOR"],
    },
    estado:{
        type: String,
        enum: ["PENDIENTE", "AUTORIZADO", "NO_AUTORIZADO"],
        default: "PENDIENTE",
    }
}, {
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
});

userSchema.virtual("avancesCreados", {
    ref: "Avance",
    localField: "_id",
    foreignField: "creadorPor",
});

userSchema.virtual("inscripciones", {
    ref: "Inscripcion",
    localField: "_id",
    foreignField: "estudiante",
});

userSchema.virtual("proyectosLiderados", {
    ref: "Proyecto",
    localField: "_id",
    foreignField: "lider",
});


const UserModel = model('User', userSchema);

export { UserModel };