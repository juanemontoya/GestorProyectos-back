import { InscriptionModel } from './inscripcion.js';

const resolverInscripciones = {
  Query: {    
    Inscripciones: async (parent, args, context) => {

      console.log("el context es,", context);
      const inscripcionesprueba = [];     

      if(context.userData.rol === 'LIDER'){
           
      const inscripciones = await InscriptionModel.find().populate('proyecto').populate('estudiante');
      console.log(inscripciones);

      inscripciones.forEach (inscripcion =>{
        if(inscripcion.proyecto.lider.valueOf() === context.userData._id){
          inscripcionesprueba.push(inscripcion);
        }      
          
      })

      console.log(inscripcionesprueba);
      
      return inscripcionesprueba;

    }
    else if(context.userData.rol === 'ESTUDIANTE'){
      const inscripciones = await InscriptionModel.find({estudiante:context.userData._id}).populate('proyecto').populate('estudiante');

      console.log(inscripciones)
      return inscripciones;
    }
    },
    Inscripcion: async (parent, args) => {
      console.log(args);
      const inscripcion = await InscriptionModel.findOne({ _id: args._id }).populate('proyecto').populate('estudiante');
      return inscripcion;
    },
    InscripcionesAprobadas: async(parent, args, context)=>{
      if(context.userData.rol === 'ESTUDIANTE'){
         const inscripcionesAprobadas = await InscriptionModel.find({ estudiante: context.userData._id, estado:"ACEPTADO", fechaEgreso: null }).populate('proyecto').populate('estudiante'); 
         return inscripcionesAprobadas
      };      
    },
  },
  
  Mutation: {
    crearInscripcion: async (parent, args) => {
      const existioInscripcion = await InscriptionModel.find({
        proyecto: args.proyecto,
        estado: "ACEPTADO",
        fechaIngreso: { $ne: null },
        fechaEgreso: { $ne: null },
      });

      const existeInscripcion = await InscriptionModel.find({
        proyecto: args.proyecto,
        estado: "ACEPTADO",
        fechaIngreso: { $ne: null },
        fechaEgreso: null,
      });

      const pendienteInscripcion = await InscriptionModel.find({
        proyecto: args.proyecto,
        estado: "PENDIENTE",
      });

      console.log(
        existioInscripcion.length,
        existeInscripcion.length,
        pendienteInscripcion.length
      );

      if (
        existioInscripcion.length > 0 &&
        existeInscripcion.length === 0 &&
        pendienteInscripcion.length === 0
      ) {
        const inscripcionCreada = await InscriptionModel.create({
          proyecto: args.proyecto,
          estudiante: args.estudiante,
        });
        return inscripcionCreada; //(???????)
      } else if (
        existeInscripcion.length === 0 &&
        pendienteInscripcion.length === 0
      ) {
        const inscripcionCreada = await InscriptionModel.create({
          proyecto: args.proyecto,
          estudiante: args.estudiante,
        });
        return inscripcionCreada;
      }
    },  
    aprobarInscripcion: async (parent, args) => {
        const inscripcionAprobada = await InscriptionModel.findByIdAndUpdate(
        args._id,
        {
          estado: 'ACEPTADO',
          fechaIngreso: Date.now(),
        },
        { new: true }
      );
      return inscripcionAprobada;
    },
    rechazarInscripcion: async (parent, args) => {
      const inscripcionRechazada = await InscriptionModel.findByIdAndUpdate(
        args._id,
        {
          estado: 'RECHAZADO',
        },
        { new: true }
      );
      return inscripcionRechazada;
    },
    finalizarInscripcion: async (parent, args) => {  

   /* const inscripcionFinalizada = await InscriptionModel.findByIdAndUpdate(
         args._id,
         {
           fechaEgreso: Date.now(),
         },
         { new: true }
       );
       return inscripcionFinalizada;
    }*/
    
      const inscripcionFinalizada = await InscriptionModel.updateMany({proyecto: args.proyecto, estado:'ACEPTADO', fechaEgreso:null}, {$set:{fechaEgreso: Date.now()}});
      console.log("a ", inscripcionFinalizada);
      return inscripcionFinalizada;
    },
  },
};

export { resolverInscripciones };