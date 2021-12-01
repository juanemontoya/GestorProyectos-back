import { UserModel } from './usuario.js';
import bcrypt from 'bcrypt';

const resolversUsuario = {

  Query: {
    Usuarios: async (parent, args) => {
      /*** populate normal ***/
     // const usuarios = await UserModel.find().populate('avancesCreados').populate('proyectosLiderados').populate('inscripciones');
     /*** populate anidado ***/
     const usuarios = await UserModel.find().populate('avancesCreados').populate('proyectosLiderados').populate([
       {
         path:"inscripciones",
         populate:{
           path:"proyecto",
           populate:
              {path:"avances"},
         }       
       }
    ]);
      return usuarios;
    },
    Usuario: async (parent, args) => {
      const usuario = await UserModel.findOne({ _id: args._id }).populate('inscripciones');
      return usuario;
    },
    Estudiantes: async (parent, args) => {
      const estudiantes = await UserModel.find({rol: 'ESTUDIANTE'});
      return estudiantes; //Este es para traer solo los estudiantes a los líderes
    },
  },  
  Mutation: {
    crearUsuario: async (parent, args) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(args.password, salt);
      const usuarioCreado = await UserModel.create({
        nombre: args.nombre,
        apellido: args.apellido,
        identificacion: args.identificacion,
        correo: args.correo,
        rol: args.rol,
        password: hashedPassword,
      });

      if (Object.keys(args).includes('estado')) {
        usuarioCreado.estado = args.estado;
      }

      return usuarioCreado;
    },
    editarUsuario: async (parent, args) => {
      const usuarioEditado = await UserModel.findByIdAndUpdate(
        args._id,
        {
          nombre: args.nombre,
          apellido: args.apellido,
          identificacion: args.identificacion,
          correo: args.correo,
          estado: args.estado,
        },
        { new: true } //permite ver los nuevos cambios, no el estado anterior
      );

      return usuarioEditado;
    },
    usuarioAutorizado: async (parent, args) => {
      const Autorizado = await UserModel.findByIdAndUpdate(
        args.id,
        {
          estado: 'AUTORIZADO',
          fechaIngreso: Date.now(),
        },
        { new: true }
      );
      return Autorizado;
    },
    usuarioNoAutorizado: async (parent, args) => {
      const No_Autorizado = await UserModel.findByIdAndUpdate(
        args.id,
        {
          estado: 'NO_AUTORIZADO',
          fechaIngreso: Date.now(),
        },
        { new: true }
      );
      return No_Autorizado;
    },
    eliminarUsuario: async (parent, args) => {
      if (Object.keys(args).includes('_id')) {
        const usuarioEliminado = await UserModel.findOneAndDelete({ _id: args._id });
        return usuarioEliminado;
      } else if (Object.keys(args).includes('correo')) {
        const usuarioEliminado = await UserModel.findOneAndDelete({ correo: args.correo });
        return usuarioEliminado;
      }
    },
  },
};

export { resolversUsuario };