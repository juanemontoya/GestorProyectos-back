import { InscriptionModel } from './inscripcion.js';

const resolverInscripciones = {
  Query: {
    Inscripciones: async (parent, args) => {
      const inscripciones = await InscriptionModel.find().populate('proyecto');
      return inscripciones;
    },
  },
  
  Mutation: {
    crearInscripcion: async (parent, args) => {
      const inscripcionCreada = await InscriptionModel.create({
        proyecto: args.proyecto,
        estudiante: args.estudiante,
      });
      return inscripcionCreada;
    },
    aprobarInscripcion: async (parent, args) => {
      const inscripcionAprobada = await InscriptionModel.findByIdAndUpdate(
        args.id,
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
        args.id,
        {
          estado: 'RECHAZADO',
          fechaIngreso: Date.now(),
        },
        { new: true }
      );
      return inscripcionRechazada;
    },
    // editarIncripcion: async (parent, args) => {
    //   const editarInscripcion = await InscriptionModel.findByIdAndUpdate(
    //     args._id,
    //     {
    //       estado: args.estado,
    //       fechaIngreso: args.fechaIngreso,
    //       fechaEgreso: args.fechaEgreso,
    //       proyecto: args.proyecto,
    //       estudiante: args.estudiante,
    //     },
    //     { new: true }
    //   );
    //   return editarInscripcion;
    //}
  },
};

export { resolverInscripciones };