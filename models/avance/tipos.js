import { gql } from 'apollo-server-express';



const tiposAvance = gql`
  type Avance {
    _id: ID!
    fecha: Date!
    descripcion: String!
    proyecto: Proyecto!
    creadoPor: Usuario!
    observaciones: [String]
  }
  input camposAvance {
    fecha: Date
    descripcion: String
    observaciones: [String]
  }

  type Query {
    Avances: [Avance]
    filtrarAvance(_id: String!): [Avance]
    avanceLider: [Avance]
    detalleAvance(_id: String!): Avance
  }
  
  type Mutation {
    crearAvance(fecha: Date!, descripcion: String!, proyecto: String!, creadoPor: String!): Avance

    editarAvance(
      _id: String!
      campos: camposAvance!
    ): Avance
    
  }
`;      

export { tiposAvance };
