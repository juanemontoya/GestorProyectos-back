import { gql } from '@apollo/client';

const EDITAR_USUARIO = gql`
  mutation EditarUsuario(
    $_id: String!
    $estado: Enum_EstadoUsuario!
  ) {
    editarUsuario(
      _id: $_id
      estado: $estado
    ) {
      _id
      nombre
      apellido
      correo
      estado
      identificacion
      rol
    }
  }
`;

const EDITAR_PERFIL = gql`
  mutation EditarPerfilUsuario(
    $_id: String!
    $nombre: String!
    $apellido: String!
    $identificacion: String!
    $correo: String!    
  ) {
    editarPerfilUsuario(
      _id: $_id
      nombre: $nombre
      apellido: $apellido
      identificacion: $identificacion
      correo: $correo
    ) {
      _id
      nombre
      apellido
      correo
      identificacion
    }
  }
`;

const EDITAR_PERFIL2 = gql`
  mutation EditarPerfilUsuario2(
    $_id: String!
    $nombre: String!
    $apellido: String!
    $identificacion: String!
    $correo: String!
    $password: String!    
  ) {
    editarPerfilUsuario2(
      _id: $_id
      nombre: $nombre
      apellido: $apellido
      identificacion: $identificacion
      correo: $correo
      password: $password
    ) {
      _id
      nombre
      apellido
      correo
      identificacion
    }
  }
`;

export { EDITAR_USUARIO, EDITAR_PERFIL, EDITAR_PERFIL2 };
