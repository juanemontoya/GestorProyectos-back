import { gql } from '@apollo/client';

const GET_INSCRIPCIONES = gql`
query Inscripciones {
    Inscripciones {
      _id
      estado
      fechaIngreso
      fechaEgreso
      proyecto {
        _id
        nombre
        lider {
          _id
        }
      }
      estudiante {
        _id
        nombre
        apellido
      }
    }
  }
`;

const GET_INSCRIPCION = gql`
query Inscripcion($_id: String!) {
    Inscripcion(_id: $_id) {
      _id
      estado
      fechaIngreso
      fechaEgreso
      proyecto {
        _id
        nombre
      }
      estudiante {
        _id
        nombre
        apellido
      }
    }
  }
`;

const GET_INSCRIPCIONESAPROBADAS = gql`
query InscripcionesAprobadas {
  InscripcionesAprobadas {
    _id
    estado
    fechaIngreso
    fechaEgreso
    proyecto {
      _id
      nombre
      lider {
        _id
      }
    }
    estudiante {
      _id
      nombre
      apellido
    }
  }
}

`;


export { GET_INSCRIPCIONES, GET_INSCRIPCION, GET_INSCRIPCIONESAPROBADAS };