import { gql } from 'apollo-server-express';

//Query = Consulta a la base de datos
//type Query: Define los tipos de querys que realizo
//type Avance: En este caso define los tipos de los datos que contiene Avance

const tiposAvance = gql`
  type Avance {
    _id: ID!
    fecha: Date!
    descripcion: String!
    observaciones: [String]
    proyecto: Proyecto!
    creadoPor: Usuario!
  }

  type Query {
    Avances: [Avance]
    filtrarAvance(_id: String!): [Avance]
    avanceLider(_id: String!): [Avance]
  }
  
  type Mutation {
    crearAvance(fecha: Date!, descripcion: String!, proyecto: String!, creadoPor: String!): Avance

    editarAvance(
      _id: String!
      observaciones: String
    ): Avance
    
  }
`;      

export { tiposAvance };
/*
editarAvance(
  creadoPor: String!
  descripcion: String
  observaciones: [String]
): Avance*/