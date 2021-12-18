import { gql } from "@apollo/client";

const CREAR_AVANCE = gql`
mutation CrearAvance($fecha: Date!, $descripcion: String!, $proyecto: String!, $creadoPor: String!) {
  crearAvance(fecha: $fecha, descripcion: $descripcion, proyecto: $proyecto, creadoPor: $creadoPor) {
    _id
    fecha
    descripcion
    proyecto {
      _id
    }
  }
}
`;

const EDITAR_AVANCE = gql `
mutation EditarAvance($_id: String!, $campos: camposAvance!) {
  editarAvance(_id: $_id, campos: $campos) {
    fecha
    descripcion
    observaciones
  }
}
`
;

const CREAR_OBSERVACION = gql`
  mutation CrearObservacion($_id: String!, $observacion: String!) {
    crearObservacion(_id: $_id, observacion: $observacion) {
      _id
      observaciones
    }
  }
`;

const EDITAR_OBSERVACION = gql`
mutation EditarObservacion($_id: String!, $indexObservacion: Int!, $observacion: String!) {
  editarObservacion(_id: $_id, indexObservacion: $indexObservacion, observacion: $observacion) {
    _id
    observaciones
  }
}
`;




export {CREAR_AVANCE, EDITAR_AVANCE, CREAR_OBSERVACION, EDITAR_OBSERVACION};