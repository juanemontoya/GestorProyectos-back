import { gql } from 'apollo-server-express';

//Query = Consulta a la base de datos
//type Query: Define los tipos de querys que realizo
//type Inscripcion: En este caso define los tipos de los datos que contiene Inscripcion

const tiposInscripcion = gql`
  type Inscripcion {
    _id: ID!
    estado: Enum_EstadoInscripcion
    fechaIngreso: Date
    fechaEgreso: Date
    proyecto: Proyecto!
    estudiante: Usuario!
  }
  
  type Query {
    Inscripciones: [Inscripcion]
  }
  
  type Mutation {
    crearInscripcion(
      proyecto: String!
      estudiante: String!
    ): Inscripcion
    aprobarInscripcion(id: String!): Inscripcion
    rechazarInscripcion(id: String!): Inscripcion
  }
`;

export { tiposInscripcion };