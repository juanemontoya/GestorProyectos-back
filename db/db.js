import mongoose from 'mongoose';
//Su equivalente sería const { connect } = require('mongoose');

const conectarBD = async ()=>{
    return await mongoose.connect(
        process.env.DATABASE_URL
    )
    .then(()=>{
        console.log("Conexión exitosa de la BD");
    })
    .catch((e)=>{
        console.error("Error conectando a la BD", e);
    });
};


export default conectarBD;