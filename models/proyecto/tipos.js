import { gql } from 'apollo-server-express';

//Query = Consulta a la base de datos
//type Query: Define los tipos de querys que realizo
//type Objetivo: En este caso define los tipos de los datos que contiene Objetivo
//type Proyecto: En este caso define los tipos de los datos que contiene Proyecto

const tiposProyecto = gql`
  type Objetivo {
    _id: ID!
    descripcion: String!
    tipo: Enum_TipoObjetivo!
  }

  input crearObjetivo {
    descripcion: String!
    tipo: Enum_TipoObjetivo!
  }

  input camposObjetivo {
    descripcion: String!
    tipo: Enum_TipoObjetivo!
  }

  input camposProyecto {
    nombre: String
    presupuesto: Float
    estado: Enum_EstadoProyecto
    fase: Enum_FaseProyecto
  }

  type Proyecto {
    _id: ID!
    nombre: String!
    presupuesto: Float!
    fechaInicio: Date
    fechaFin: Date
    estado: Enum_EstadoProyecto
    fase: Enum_FaseProyecto
    lider: Usuario!
    objetivos: [Objetivo]
    avances: [Avance]
    inscripciones: [Inscripcion]
  }

  type Query {
    Proyectos: [Proyecto]
    Proyecto(_id: String!): Proyecto
    ProyectosLiderados(id_lider: String!): [Proyecto]
  }

  type Mutation {
    crearProyecto(
      nombre: String!
      presupuesto: Float!
      lider: String!
      objetivos: [crearObjetivo]
    ): Proyecto

    editarProyecto(
      _id: String!
      campos: camposProyecto!
    ): Proyecto

    crearObjetivo(
      idProyecto: String!
      campos: camposObjetivo!
    ): Proyecto

    editarObjetivo(
      idProyecto: String!
      indexObjetivo: Int!
      campos: camposObjetivo!
    ): Proyecto

    eliminarObjetivo(
      idProyecto: String!
      idObjetivo: String!
    ): Proyecto

    activarEstado(
      _id: String!
    ): Proyecto

    terminarProyecto(
      _id: String!
    ): Proyecto

    problemaProyecto(
      _id: String!
    ): Proyecto

    activarProyecto(
      _id: String!
    ): Proyecto

  }
`;

export { tiposProyecto };