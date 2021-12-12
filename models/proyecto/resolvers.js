import { ProjectModel } from "./projecto.js";
import { InscriptionModel } from "../inscripcion/inscripcion.js";

const resolversProyecto = {
  Proyecto: {
    inscripciones: async (parent, args, context) => {
      const inscripciones = await InscriptionModel.find({
        proyecto: parent._id,
      });
      return inscripciones;
    },
  },
  Query: {
    Proyectos: async (parent, args, context) => {
      console.log("User Context:", context);
      
      if (context.userData.rol === "LIDER") {
        const proyectos = await ProjectModel.find({
          lider: context.userData._id,
        })
          .populate("lider")
          // .populate("inscripciones");
        return proyectos;
      } else {
        const proyectos = await ProjectModel.find()
          .populate("lider")
          // .populate("inscripciones");
        return proyectos;
      }
    },
    Proyecto: async (parent, args) => {
      const proyecto = await ProjectModel.findOne({ _id: args._id }).populate(
        "lider"
      );
      return proyecto;
    },
    ProyectosLiderados: async (parent, args) => {
      const proyectosFilter = await ProjectModel.find({
        lider: args.id_lider,
      }).populate("lider");
      return proyectosFilter;
    },
  },
  Mutation: {
    crearProyecto: async (parent, args) => {
      const proyectoCreado = await ProjectModel.create({
        nombre: args.nombre,
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
          fechaInicio: Date.now(),
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
          fechaFin: Date.now(),
        },
        { new: true }
      );
      // const inscripcionFinalizada =
      await InscriptionModel.updateMany(
        { proyecto: args._id, estado: "ACEPTADO", fechaEgreso: null },
        { $set: { fechaEgreso: Date.now() } }
      );
      return proyectoTerminado;
    },

    problemaProyecto: async (parent, args) => {
      const problema = await ProjectModel.findByIdAndUpdate(
        args._id,
        {
          estado: "INACTIVO",
          fechaFin: Date.now(),
        },
        { new: true }
      );
      await InscriptionModel.updateMany(
        { proyecto: args._id, estado: "ACEPTADO", fechaEgreso: null },
        { $set: { fechaEgreso: Date.now() } }
      );
      return problema;
    },
    activarProyecto: async (parent, args) => {
      const proyectoActivo = await ProjectModel.findByIdAndUpdate(
        args._id,
        {
          estado: "ACTIVO",
          fechaInicio: Date.now(),
        },
        { new: true }
      );
      return proyectoActivo;
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