import { gql } from 'apollo-server-express';

//Query = Consulta a la base de datos
//type Query: Define los tipos de querys que realizo
//type Usuario: En este caso define los tipos de los datos que contiene usuario

const tiposUsuario = gql`
  type Usuario {
    _id: ID!
    nombre: String!
    apellido: String!
    identificacion: String!
    correo: String!
    rol: Enum_Rol!
    estado: Enum_EstadoUsuario
    inscripciones: [Inscripcion]
    avancesCreados: [Avance]
    proyectosLiderados: [Proyecto]
  }

  input FiltroUsuarios{
    _id: ID
    identificacion: String
    correo: String
    rol: Enum_Rol
    estado: Enum_EstadoUsuario
  }


  type Query {
    Usuarios(filtro: FiltroUsuarios): [Usuario]
    Usuario(_id: String!): Usuario
    Estudiantes(rol: String!): [Usuario]
  }

  type Mutation {
    crearUsuario(
      nombre: String!
      apellido: String!
      identificacion: String!
      correo: String!
      rol: Enum_Rol!
      estado: Enum_EstadoUsuario   
      password: String!   
    ): Usuario

    editarUsuario(
      _id: String!
      estado: Enum_EstadoUsuario!
    ): Usuario

    editarPerfilUsuario(
      _id: String!
      nombre: String!
      apellido: String!
      identificacion: String!
      correo: String!
    ): Usuario

    editarPerfilUsuario2(
      _id: String!
      nombre: String!
      apellido: String!
      identificacion: String!
      correo: String!
      password: String!
    ): Usuario

    eliminarUsuario(_id: String, correo: String): Usuario
    usuarioAutorizado(_id: String!): Usuario
    usuarioNoAutorizado(_id: String!): Usuario
  }
`;

export { tiposUsuario };