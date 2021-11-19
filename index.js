import conectarBD from "./db/db.js";
import dotenv from 'dotenv';
import express from 'express';
import { UserModel } from './models/usuario/usuario.js'

dotenv.config();

const app = express();

app.use(express.json());

app.listen({ port: process.env.PORT || 4000 }, async ()=>{
    await conectarBD();

});




/******** CRUD DE USUARIOS ***************/

/*******  CREAR UN USUARIO **********/
/*
const crearUsuario = await UserModel.create({
       correo:"pruebas23@gmail.com",
       identificacion:"1234wwww56",
       nombre:"Andres Felipe",
       apellido:"García",
       rol: Enum_Rol.administrador,

    }).then(user =>{
        console.log("Usuario creado ", user)
    }).catch(e=>{
        console.error("Error creando el usuario ", e)
    });*/

    /*******  OBTENER LOS USUARIOS **********/
/*

const obtenerUsuarios = await UserModel.find()
    .then(user=>{
       console.log("Usuarios ", user);
    })
    .catch(e=>{
        console.error("Error obteniendo los usuarios ", e);    
    });   

*/

    /*******  OBTENER UN SOLO USUARIOS **********/
    /*
const obtenerUsuario = await UserModel.findOne(
        {identificacion:'12345aaa6'}
        ).then(user => {
            console.log('Usuario encontrado', user);
        })
        .catch(e =>{
            console.log('Error encontrando usuario', e);
        });*/

    /*******  MODIFICAR LOS USUARIOS **********/

/*
const modificarUsuario = await UserModel.findOneAndUpdate(
        {correo: 'prueba@gmail.com'},
        {
            nombre: 'Juan',
            apellido: 'Montoya',
        })
        .then(user => {
            console.log('Usuario actualizado', user);
        })
        .catch(e =>{
            console.log('Error actualizando usuario', e);
        });*/
    
    /*******  ELIMINAR LOS USUARIOS **********/
/*
const eliminarUsuario = await UserModel.findOneAndDelete(
        {correo: 'prueba@gmail.com'}
        )
        .then(user => {
            console.log('Usuario eliminado', user);
        })
        .catch(e =>{
            console.log('Error eliminado usuario', e);
        });;
    */    

    /********** CRUD PROYECTOS */

/*******  CREAR UN PROYECTO **********/

    /*
const crearProyecto = await ProjectModel.create({
        nombre: 'Projecto MIsionTIC',
        presupuesto: 120,
        fechaInicio: Date.now(),
        fechaFin: new Date("2022/11/10"),
        lider: '618b07a5a56eab67207bb366',
        objetivos:[
            {descripcion: "Este es el objetivo general", tipo: Enum_TipoObjetivo.general},
            {descripcion: "Este es el objetivo específico 1", tipo: Enum_TipoObjetivo.especifico},
            {descripcion: "Este es el objetivo específico 2", tipo: Enum_TipoObjetivo.especifico},
        ],
       });*/

   /*******  OBTENER LOS PROYECTOS **********/
/*

const obtenerProyectos = await ProjectModel.find()
    .then(project=>{
       console.log("Projectos ", project);
    })
    .catch(e=>{
        console.error("Error obteniendo los projectos ", e);    
    });   

*/

    /*******  MODIFICAR LOS PROYECTOS **********/

/*
const modificarProjecto = await ProjectModel.findOneAndUpdate(
        {nombre: 'xxxxx'},
        {
            objetivo[0].descripcion: 'Juan',
            fechaFin: newDate("2022/12/10"),
        })
        .then(project => {
            console.log('Projecto actualizado', project);
        })
        .catch(e =>{
            console.log('Error actualizando prjecto', e);
        });*/

            /*******  ELIMINAR PROYECTOS **********/
/*
const eliminarProjecto = await ProjectModel.findOneAndDelete(
        {nombre: 'xxxxx'}
        )
        .then(project => {
            console.log('Projecto eliminado', project);
        })
        .catch(e =>{
            console.log('Projecto eliminado', e);
        });;
    */  

  /********** CRUD INSCRIPCIONES */

/*******  CREAR UNA INSCRIPCION **********/

    /*
const crearInscripciones = await InscriptionModel.create({
        projecto: '',
        estudiante: '',
        fechaInicio: Date.now(),
        fechaFin: new Date("2022/11/10"),
        lider: '618b07a5a56eab67207bb366',
        objetivos:[
            {descripcion: "Este es el objetivo general", tipo: Enum_TipoObjetivo.general},
            {descripcion: "Este es el objetivo específico 1", tipo: Enum_TipoObjetivo.especifico},
            {descripcion: "Este es el objetivo específico 2", tipo: Enum_TipoObjetivo.especifico},
        ],
       });*/

   /*******  OBTENER INSCRIPCIONES **********/
/*

const obtenerInscripciones = await InscriptionModel.find()
    .then(project=>{
       console.log("Projectos ", project);
    })
    .catch(e=>{
        console.error("Error obteniendo los projectos ", e);    
    });   

*/

    /*******  MODIFICAR UNA INSCRIPCION **********/

/*
const modificarProjecto = await ProjectModel.findOneAndUpdate(
        {nombre: 'xxxxx'},
        {
            objetivo[0].descripcion: 'Juan',
            fechaFin: newDate("2022/12/10"),
        })
        .then(project => {
            console.log('Projecto actualizado', project);
        })
        .catch(e =>{
            console.log('Error actualizando prjecto', e);
        });*/

            /*******  ELIMINAR UNA INSCRIPCION **********/
/*
const eliminarProjecto = await ProjectModel.findOneAndDelete(
        {nombre: 'xxxxx'}
        )
        .then(project => {
            console.log('Projecto eliminado', project);
        })
        .catch(e =>{
            console.log('Projecto eliminado', e);
        });;
    */  



    /********** CRUD AVANCES */
    
       