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
    Inscripcion(_id: String!): Inscripcion
  }
  
  type Mutation {
    crearInscripcion(
      proyecto: String!
      estudiante: String!
    ): Inscripcion

    aprobarInscripcion(_id: String!): Inscripcion

    rechazarInscripcion(_id: String!): Inscripcion

    finalizarInscripcion(proyecto: String!): Inscripcion   


  }


`;

export { tiposInscripcion };