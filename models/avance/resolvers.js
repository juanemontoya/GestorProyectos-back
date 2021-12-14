import { ModeloAvance } from './avance.js';
import { ProjectModel } from '../proyecto/projecto.js';

const resolversAvance = {
  Query: {
    Avances: async (parent, args) => {
      const avances = await ModeloAvance.find().populate('proyecto').populate('creadoPor');
      return avances;
    },
    detalleAvance: async(parent, args) =>{
      const detalleAvance = await ModeloAvance.findOne({_id: args._id}).populate('proyecto').populate('creadoPor');
      return detalleAvance;
    },
    filtrarAvance: async (parents, args) => {
      const avanceFiltrado = await ModeloAvance.find({ proyecto: args._id })
        .populate('proyecto')
        .populate('creadoPor');
      return avanceFiltrado;
    },
    avanceLider: async (parents, args, context) => {
      const avancesTotales = []
      if (context.userData.rol === 'LIDER') {
        const avances = await ModeloAvance.find({
          creadoPor: context.userData._id,
        }).populate('proyecto').populate('creadoPor');
        avances.forEach(avance => {
          if (avance.proyecto.lider.valueOf() === context.userData._id) {
            avancesTotales.push(avance);
          }
        })
        return avancesTotales;
      }
      else if (context.userData.rol === 'ESTUDIANTE') {
        const avances = await ModeloAvance.find({ estudiante: context.userData._id }).populate('proyecto');
        /*.populate('estudiante');*/
        return avances;
      }
    },
  },

  Mutation: {
    crearAvance: async (parents, args, context) => {
      console.log("ARGUMENTOS SON: ", args)
      const proyecto = await ProjectModel.findById(args.proyecto).populate("avances")
      if (proyecto.avances.length === 0 || proyecto.avances === null) {
        await ProjectModel.findByIdAndUpdate(args.proyecto, {
          fase: "DESARROLLO",
        },
          { new: true })
      }
      const inscripcion = await ProjectModel.findById(args.proyecto).populate([
        {
          path: "inscripciones",
        }
      ])
      let isEnabled = false;
      inscripcion.inscripciones.map((inscripcion) => {
        if (args.creadoPor === inscripcion.estudiante.toString() && inscripcion.estado == 'ACEPTADO') {
          isEnabled = true
        }
      })
      if (isEnabled) {
        const avanceCreado = ModeloAvance.create({
          fecha: args.fecha,
          descripcion: args.descripcion,
          proyecto: args.proyecto,
          creadoPor: args.creadoPor,
        });
        return avanceCreado;
      }
      return null;
    },
    editarAvance: async (parent, args) => {
      const avanceEditado = await ModeloAvance.findByIdAndUpdate(
        args._id,
        { ...args.campos },
        { new: true }
      );
      return avanceEditado;
    },
  },
};

export { resolversAvance };