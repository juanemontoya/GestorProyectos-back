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

  type Query {
    Usuarios: [Usuario]
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
    ): Usuario

    editarUsuario(
      _id: String!
      nombre: String!
      apellido: String!
      identificacion: String!
      correo: String!
      estado: Enum_EstadoUsuario!
    ): Usuario

    eliminarUsuario(_id: String, correo: String): Usuario
    usuarioAutorizado(id: String!): Usuario
    usuarioNoAutorizado(id: String!): Usuario
  }
`;

export { tiposUsuario };