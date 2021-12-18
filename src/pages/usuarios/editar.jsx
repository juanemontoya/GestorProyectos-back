import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { EDITAR_USUARIO } from 'graphql/usuarios/mutations';
import DropDown from 'components/Dropdown';
import { Enum_EstadoUsuario, Enum_EstadoUsuarioLider } from 'utils/enums';
import { useUser } from 'context/userContext';
import PrivateRoute from 'components/PrivateRoute';

const EditarUsuario = () => {
  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams();
  const { userData } = useUser();

  console.log(userData);
  
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_USUARIO, {
    variables: { _id },
  });

  console.log(queryData);

  const [editarUsuario, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(EDITAR_USUARIO);

  const submitForm = (e) => {
    e.preventDefault();
    console.log('fd', formData);
    editarUsuario({
      variables: { _id, ...formData },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Usuario modificado correctamente');
      window.location.href = "/usuarios";      
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error modificando el usuario');
    }

    if (queryError) {
      toast.error('Error consultando el usuario');
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div>Cargando....</div>;

  return (
    <PrivateRoute roleList={['ADMINISTRADOR','LIDER']}>
    <div className='flex flex-col w-full h-full items-center'>
      <Link to='/usuarios'>
        <i className='fas fa-arrow-left mr-96 mt-7 text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <h1 className='m-4 text-2xl font-bold text-center'>Editar Usuario</h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-right justify-center'
      >
        <Input
          label='Nombre del usuario:'
          type='text'
          name='nombre'
          defaultValue={queryData.Usuario.nombre}
          required={true}
          disabled = {true}
        />
        <Input
          label='Apellidos del usuario:'
          type='text'
          name='apellido'
          defaultValue={queryData.Usuario.apellido}
          required={true}
          disabled = {true}
        />
        <Input
          label='Correo Electrónico del usuario:'
          type='email'
          name='correo'
          defaultValue={queryData.Usuario.correo}
          required={true}
          disabled = {true}
        />
        <Input
          label='Identificación del usuario:'
          type='text'
          name='identificacion'
          defaultValue={queryData.Usuario.identificacion}
          required={true}
          disabled = {true}
        />

        <DropDown
          label='Estado del usuario:'
          name='estado'
          defaultValue={queryData.Usuario.estado}
          required={true}
          options={userData.rol==='ADMINISTRADOR'? Enum_EstadoUsuario:Enum_EstadoUsuarioLider}
        />

        <label htmlFor="Rol del Usuario" className='flex flex-col my-3'>
        <span className='font-bold'>Rol del usuario:</span>
        <input type ="text" className='input' defaultValue={queryData.Usuario.rol} disabled/>
        </label>

        <div className='flex'>
          <div className ="mr-10">
          <ButtonLoading
            disabled={Object.keys(formData).length === 0}
            loading={mutationLoading}
            text='Confirmar'
          />
          </div>
          <Link to='/usuarios'>
          <ButtonLoading
            disabled={Object.keys(formData).length === 0}
            loading={mutationLoading}
            text='Cancelar'
          />
          </Link>
        </div>

      </form>
    </div>
    </PrivateRoute>
  );
};

export default EditarUsuario;
