import { ProjectModel } from "./projecto.js";

const resolversProyecto = {
  Query: {
    Proyectos: async (parent, args) => {
      const proyectos = await ProjectModel.find().populate('lider');
      // .populate("avances")
      // .populate("inscripciones");
      return proyectos;
    },
    Proyecto: async (parent, args) => {
      const proyecto = await ProjectModel.findOne({ _id: args._id });
      return proyecto;
    },
    // ProyectosLiderados: async (parent, args) => {
    //   const proyectosLiderados = await ProjectModel.findOne({
    //     "lider": args.id_lider,
    //   }).populate('lider');
    //   return proyectosLiderados;
    // },
  },
  Mutation: {
    crearProyecto: async (parent, args) => {
      const proyectoCreado = await ProjectModel.create({
        nombre: args.nombre,
        estado: args.estado,
        fechaInicio: args.fechaInicio,
        fechaFin: args.fechaFin,
        presupuesto: args.presupuesto,
        lider: args.lider,
        objetivos: args.objetivos,
      });
      return proyectoCreado;
    },

    editarProyecto: async (parent, args) => {
      const proyectoEditado = await ProjectModel.findByIdAndUpdate(
        args._id,
        { ...args.campos },
        { new: true }
      );
      return proyectoEditado;
    },

    activarEstado: async (parent, args) => {
      const estadoActivo = await ProjectModel.findByIdAndUpdate(
        args._id,
        {
          estado: "ACTIVO",
          fase: "INICIADO",
        },
        { new: true }
      );
      return estadoActivo;
    },

    terminarProyecto: async (parent, args) => {
      const proyectoTerminado = await ProjectModel.findByIdAndUpdate(
        args._id,
        {
          fase: "TERMINADO",
          estado: "INACTIVO",
        },
        { new: true }
      );
      return proyectoTerminado;
    },

    problemaProyecto: async (parent, args) => {
      const problema = await ProjectModel.findByIdAndUpdate(
        args._id,
        {
          estado: "INACTIVO",
        },
        { new: true }
      );
      return problema;
    },

    crearObjetivo: async (parent, args) => {
      const proyectoConObjetivo = await ProjectModel.findByIdAndUpdate(
        args.idProyecto,
        {
          $addToSet: {
            objetivos: { ...args.campos },
          },
        },
        { new: true }
      );
      return proyectoConObjetivo;
    },

    editarObjetivo: async (parent, args) => {
      const proyectoEditado = await ProjectModel.findByIdAndUpdate(
        args.idProyecto,
        {
          $set: {
            [`objetivos.${args.indexObjetivo}.descripcion`]:
              args.campos.descripcion,
            [`objetivos.${args.indexObjetivo}.tipo`]: args.campos.tipo,
          },
        },
        { new: true }
      );
      return proyectoEditado;
    },

    eliminarObjetivo: async (parent, args) => {
      const proyectoObjetivo = await ProjectModel.findByIdAndUpdate(
        { _id: args.idProyecto },
        {
          $pull: {
            objetivos: {
              _id: args.idObjetivo,
            },
          },
        },
        { new: true }
      );
      return proyectoObjetivo;
    },
  },
};

export { resolversProyecto };
