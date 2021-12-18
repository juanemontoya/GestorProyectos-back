import { UserModel } from './usuario.js';
import bcrypt from 'bcrypt';

const resolversUsuario = {

  Query: {
    Usuarios: async (parent, args, context) => {
    
     /*** populate anidado ***/  
     console.log('User Context: ', context);
     
     if(context.userData.rol === 'ADMINISTRADOR'){
        const usuarios = await UserModel.find().populate('avancesCreados').populate('proyectosLiderados').populate([
          {
            path:"inscripciones",
            populate:{
              path:"proyecto",
            }       
          }
      ]);
        return usuarios;
     }else if(context.userData.rol === 'LIDER'){
        const usuarios = await UserModel.find({rol:'ESTUDIANTE'}).populate('avancesCreados').populate('proyectosLiderados').populate([
          {
            path:"inscripciones",
            populate:{
              path:"proyecto",
            }       
          }
        ]);
        return usuarios;       
     }else{
      const usuarios = await UserModel.find({...args.filtro}).populate('avancesCreados').populate('proyectosLiderados').populate('inscripciones');
      return usuarios;
     }

     
    },
    Usuario: async (parent, args) => {
      const usuario = await UserModel.findOne({ _id: args._id }).populate('inscripciones');
      return usuario;
    },
    Estudiantes: async (parent, args) => {
      const estudiantes = await UserModel.find({rol: args.rol});
      return estudiantes;
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
          estado: args.estado,
        },
        { new: true } //permite ver los nuevos cambios, no el estado anterior
      );

      return usuarioEditado;
    },
    editarPerfilUsuario: async (parent, args) => {
      const perfilUsuarioEditado = await UserModel.findByIdAndUpdate(
        args._id,
        {
          nombre: args.nombre,
          apellido: args.apellido,
          identificacion: args.identificacion,
          correo: args.correo,         
        },
        { new: true } //permite ver los nuevos cambios, no el estado anterior
      );
      return perfilUsuarioEditado;
    },
    editarPerfilUsuario2: async (parent, args) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(args.password, salt);
      const perfilUsuarioEditado2 = await UserModel.findByIdAndUpdate(
        args._id,
        {
          nombre: args.nombre,
          apellido: args.apellido,
          identificacion: args.identificacion,
          correo: args.correo,
          password: hashedPassword,         
        },
        { new: true } //permite ver los nuevos cambios, no el estado anterior
      );
      return perfilUsuarioEditado2;
    },
    usuarioAutorizado: async (parent, args) => {
      const Autorizado = await UserModel.findByIdAndUpdate(
        args._id,
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
        args._id,
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