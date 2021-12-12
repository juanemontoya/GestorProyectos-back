import { ModeloAvance } from './avance.js';

const resolversAvance = {
  Query: {
    Avances: async (parent, args) => {
      const avances = await ModeloAvance.find().populate('proyecto').populate('creadoPor');
      return avances;
    },
    filtrarAvance: async (parents, args, context) => {
      const avanceFiltrado = await ModeloAvance.find({ creadoPor: args._id })
        .populate('proyecto')
        .populate('creadoPor');
      return avanceFiltrado;
    },
  },
  
  Mutation: {
    crearAvance: async (parents, args) => {
      const avanceCreado = await ModeloAvance.create({
        fecha: args.fecha,
        descripcion: args.descripcion,
        proyecto: args.proyecto,
        creadoPor: args.creadoPor,
      });

      
      return avanceCreado;
    },
    editarAvance: async (parent, args) => {
      const avanceEditado = await ModeloAvance.findByIdAndUpdate(
        args._id,
        {
          descripcion: args.descripcion,
          observaciones: args.observaciones,
        },
        { new: true }
      );
      return avanceEditado;
    },
  },
};

export { resolversAvance };