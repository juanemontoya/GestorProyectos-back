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
    /*
    editarAvance: async (parent, args) => {
      const lider = await ModeloAvance.findById(args._id).populate("creadoPor")
      //CASO DE QUE SEA EL LIDER
      if(args.creadoPor == lider._id.toString()){
        const avanceEditado = await ModeloAvance.findByIdAndUpdate(
          args.creadoPor,
          {
            observaciones: args.observaciones,
          },
          {new:true}
        );
        return avanceEditado;
      }
      //CASO DE QUE NO SEA EL LIDER
      else{
        const proyecto = await ModeloAvance.findById(args._id).populate([
          {
            path: "proyecto",
            populate:{
              path:"inscripciones"
            }
          }
        ])
        let isEnabled = false;
        proyecto.proyecto.inscripciones.map((inscripcion)=>{
          if(args.creadoPor === inscripcion.estudiante.toString()){
            isEnabled = true
          }
        })
        if(isEnabled){
          const avanceEditado = await ModeloAvance.findByIdAndUpdate(
            args._id,
            {
              descripcion: args.descripcion,
            },
            { new : true}
          );
          return avanceEditado;
        }
      }
      return null;
    },*/
  },
};

export { resolversAvance };