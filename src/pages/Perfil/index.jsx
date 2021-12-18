import React, { useEffect } from 'react';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { Link } from 'react-router-dom';
import { useUser } from 'context/userContext';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { EDITAR_PERFIL, EDITAR_PERFIL2 } from 'graphql/usuarios/mutations';


const IndexPerfil = () => {

  const { userData } = useUser();
  const  _id  = userData._id;
  console.log('fd', _id);
  
  const { form, formData, updateFormData } = useFormData(null);

  const [editarPerfilUsuario, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(EDITAR_PERFIL);

  const [editarPerfilUsuario2, { data: mutationData2, loading: mutationLoading2, error: mutationError2 }] = useMutation(EDITAR_PERFIL2);

  const submitForm = (e) => {
    e.preventDefault();
    console.log('fd', formData);
    if(formData.password === ''){
      delete formData.password;
      editarPerfilUsuario({
        variables: { _id, ...formData },
      });
    }else{
      editarPerfilUsuario2({
        variables: { _id, ...formData },
      });           
    }  
  };

  useEffect(() => {
    if (mutationData || mutationData2) {
      toast.success('Usuario modificado correctamente');
      localStorage.removeItem('token');       
    }
  }, [mutationData, mutationData2]);

  useEffect(() => {
    if (mutationError || mutationError2) {
      toast.error('Error modificando el usuario');
    }
  }, [mutationError, mutationError2]);

  return (
    <div className="flex flex-col w-full h-full items-center mt-16">
      <h1 className='m-4 text-2xl font-bold text-center'>Mi Perfil</h1>
      <div className="flex content-around justify-center">      
      <i className='far fa-user-circle big-icon mt-6 mr-12' />
      <form   
        onSubmit={submitForm}     
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-right justify-center'
      >
        <Input
          label='Nombre :'
          type='text'
          name='nombre'
          defaultValue={userData.nombre}
          required={true}
        />
        <Input
          label='Apellido:'
          type='text'
          name='apellido'
          defaultValue={userData.apellido}
          required={true}
        />
        <Input
          label='Identificación:'
          type='text'
          name='identificacion'
          defaultValue={userData.identificacion}
          required={true}
        />
        <Input
          label='Correo Electrónico:'
          type='email'
          name='correo'
          defaultValue={userData.correo}
          required={true}
        />

        <Input 
        name='password' 
        type='password' 
        label='Contraseña' 
        required={false} />   

        <div className='flex mt-6'>
          <div className ="mr-10">
          <ButtonLoading
            disabled={Object.keys(formData).length === 0}
            loading={mutationLoading || mutationLoading2}
            text='Confirmar'
          />
          </div>
          <Link to='/'>
          <ButtonLoading
            disabled={Object.keys(formData).length === 0}
            loading={mutationLoading || mutationLoading2}
            text='Cancelar'
          />
          </Link>         
        </div>    
      </form>
      </div>
    </div>
  );
};

export default IndexPerfil;
