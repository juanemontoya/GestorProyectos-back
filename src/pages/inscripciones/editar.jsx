import React, { useEffect } from 'react';
import PrivateRoute from 'components/PrivateRoute';
import useFormData from 'hooks/useFormData';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_INSCRIPCION } from 'graphql/inscripciones/queries';
import { toast } from 'react-toastify';
import Input from 'components/Input';
import DropDown from 'components/Dropdown';
import ButtonLoading from 'components/ButtonLoading';
import { Enum_EstadoInscripcion } from 'utils/enums';
import { APROBAR_INSCRIPCION, RECHAZAR_INSCRIPCION } from 'graphql/inscripciones/mutations';

const EditarInscripciones = () => {
    const { form, formData, updateFormData } = useFormData(null);
    const { _id } = useParams()

    console.log(_id);
 
    const {
      data: queryData,
      error: queryError,
      loading: queryLoading,
    } = useQuery(GET_INSCRIPCION, {
      variables: { _id },
    });

    console.log(queryData);
    
    const [aprobarInscripcion, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(APROBAR_INSCRIPCION);

    const [rechazarInscripcion, { data: dataMutation, loading: dataLoading, error: dataError }] =
    useMutation(RECHAZAR_INSCRIPCION);

    const submitForm = (e) => {
        e.preventDefault();
        console.log('fd', formData);
        if (formData.estado==='ACEPTADO'){
            aprobarInscripcion({ variables: { _id } });
        }else if(formData.estado==='RECHAZADO'){
            rechazarInscripcion({ variables: { _id } });
        }
    };

    useEffect(() => {
        if (mutationData || dataMutation) {
          toast.success('Inscripción modificada correctamente');
          window.location.href = "/inscripciones";      
        }
    }, [mutationData, dataMutation]);



    useEffect(() => {
    
        if (mutationError || dataError) {
                toast.error('Error modificando inscripción');
        }
 
        if (queryError) {
            toast.error('Error consultando inscripción');
        }

    }, [queryError, mutationError,dataError]);
  
    if (queryLoading) return <div>Cargando....</div>;


    console.log(queryData);

    return(
        <PrivateRoute roleList={['LIDER','ESTUDIANTE']}>
        <div className='flex flex-col w-full h-full items-center'>
      <Link to='/inscripciones'>
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
          defaultValue={queryData.Inscripcion.estudiante.nombre}
          required={true}
          disabled = {true}
        />
        <Input
          label='Apellidos del usuario:'
          type='text'
          name='apellido'
          defaultValue={queryData.Inscripcion.estudiante.apellido}
          required={true}
          disabled = {true}
        />
        <Input
          label='Proyecto:'
          type='email'
          name='correo'
          defaultValue={queryData.Inscripcion.proyecto.nombre}
          required={true}
          disabled = {true}
        />
        <DropDown
          label='Estado del usuario:'
          name='estado'
          defaultValue={queryData.Inscripcion.estado}
          required={true}
          options={Enum_EstadoInscripcion}
        />


        <div className='flex'>
          <div className ="mr-10">
          <ButtonLoading
            disabled={Object.keys(formData).length === 0}
            loading={mutationLoading || dataLoading}
            text='Confirmar'
          />
          </div>
          <Link to='/inscripciones'>
          <ButtonLoading
            disabled={Object.keys(formData).length === 0}
            loading={mutationLoading || dataLoading}
            text='Cancelar'
          />
          </Link>
        </div>

      </form>
    </div>
        </PrivateRoute>
    );

};

export default EditarInscripciones;