import { gql } from "@apollo/client";

const EDITAR_PROYECTO = gql`
  mutation EditarProyecto($_id: String!, $campos: camposProyecto!) {
    editarProyecto(_id: $_id, campos: $campos) {
      nombre
      presupuesto
    }
  }
`;

const CREAR_PROYECTO = gql`
  mutation CrearProyecto(
    $nombre: String!
    $presupuesto: Float!
    $lider: String!
    $objetivos: [crearObjetivo]
  ) {
    crearProyecto(
      nombre: $nombre
      presupuesto: $presupuesto
      lider: $lider
      objetivos: $objetivos
    ) {
      _id
    }
  }
`;

const ACTIVAR_ESTADO = gql`
  mutation ActivarEstado($_id: String!) {
    activarEstado(_id: $_id) {
      _id
    }
  }
`;

const TERMINAR_PROYECTO = gql`
  mutation TerminarProyecto($_id: String!) {
    terminarProyecto(_id: $_id) {
      _id
    }
  }
`;

const PROBLEMA_PROYECTO = gql`
  mutation ProblemaProyecto($_id: String!) {
    problemaProyecto(_id: $_id) {
      _id
    }
  }
`;

const ACTIVAR_PROYECTO = gql`
  mutation ActivarProyecto($_id: String!) {
    activarProyecto(_id: $_id) {
      _id
    }
  }
`;

const EDITAR_OBJETIVO = gql`
  mutation EditarObjetivo(
    $idProyecto: String!
    $indexObjetivo: Int!
    $campos: camposObjetivo!
  ) {
    editarObjetivo(
      idProyecto: $idProyecto
      indexObjetivo: $indexObjetivo
      campos: $campos
    ) {
      _id
    }
  }
`;

export { EDITAR_PROYECTO, CREAR_PROYECTO, ACTIVAR_ESTADO, TERMINAR_PROYECTO, PROBLEMA_PROYECTO, ACTIVAR_PROYECTO, EDITAR_OBJETIVO };