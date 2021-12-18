import { gql } from "@apollo/client";

const GET_PROYECTOS = gql`
  query Proyectos {
    Proyectos {
      _id
      nombre
      presupuesto
      fechaInicio
      fechaFin
      estado
      fase
      inscripciones {
        estado
        estudiante {
          _id
        }
      }
    }
  }
`;

const GET_PROYECTO = gql`
  query Proyecto($_id: String!) {
    Proyecto(_id: $_id) {
      _id
      nombre
      presupuesto
      fechaInicio
      fechaFin
      estado
      fase
      objetivos {
        tipo
        descripcion
      }
      lider {
        nombre
        identificacion
      }
    }
  }
`;

export { GET_PROYECTOS, GET_PROYECTO };