import { gql } from '@apollo/client';

const GET_AVANCES = gql`
  query AvanceLider {
  avanceLider {
    _id
    fecha
    descripcion
    proyecto {
      nombre
    }
  }
}
`;

const GET_AVANCE = gql`
query Query($_id: String!) {
  detalleAvance(_id: $_id) {
    _id
    fecha
    descripcion
    observaciones
    proyecto {
      nombre
    }
    creadoPor {
      nombre
    }
  }
}
`;



export { GET_AVANCES, GET_AVANCE};