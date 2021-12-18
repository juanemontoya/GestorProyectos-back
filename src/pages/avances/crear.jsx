import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import useFormData from 'hooks/useFormData';
import { useUser } from 'context/userContext';
import { toast } from 'react-toastify';
import ButtonLoading from 'components/ButtonLoading';
import { GET_INSCRIPCIONESAPROBADAS } from 'graphql/inscripciones/queries';
import { CREAR_AVANCE } from 'graphql/avances/mutations';
import Input from 'components/Input';
import PrivateRoute from 'components/PrivateRoute';
import DropDown from 'components/Dropdown';

const CrearAvance = () => {

  const { form, formData, updateFormData } = useFormData(null);
    const { userData } = useUser();
    const [listaProyectos, setListaProyecto] =useState({})
    const _id = userData._id;

    const [
        crearAvance,
        { data: mutationData, loading: mutationLoading, error: mutationError },
    ] = useMutation(CREAR_AVANCE);

    const { data, error, loading } = useQuery(GET_INSCRIPCIONESAPROBADAS);

    useEffect(() => {
        console.log("Data Mutation", mutationData);
    });
    
    useEffect(() => {
      if (data) {
        const lu = {};
        data.InscripcionesAprobadas.forEach((elemento) => {
          lu[elemento.proyecto._id] = elemento.proyecto.nombre;
        });
  
        setListaProyecto(lu);
      }
   
    }, [data]);
    
    const submitForm = (e) => {
        e.preventDefault();
        console.log("Lo que entra", formData);
        console.log(formData.proyecto);
        console.log("user ID", _id)
        crearAvance({
            variables: {
                fecha: formData.fecha,
                descripcion: formData.descripcion,
                proyecto:formData.proyecto,
                creadoPor: _id,
            },
        });
    };
    useEffect(() => {
        console.log("DATA DE PROYECTOS: ", data);
    }, [data]);

    useEffect(() => {
        if (mutationData) {
            toast.success("Avance registrado con exito");
            window.location.href = "/avances";
        }
    }, [mutationData]);

    useEffect(() => {
        if (mutationError) {
            toast.error("Error registrando el avance");
        }
        if (error) {
          toast.error("Error consultando proyectos inscritos");
        }
    }, [mutationError, error]);

    if (mutationLoading) {
        return <div>Cargando...</div>
    }

    return (
      
    <PrivateRoute roleList={['ESTUDIANTE','LIDER']}>
    <div className='flex flex-col w-full h-full items-center'>
      <Link to='/avances'>
        <i className='fas fa-arrow-left mr-96 mt-7 text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <h1 className='m-4 text-2xl font-bold text-center'>Crear Avance</h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-right justify-center'
      >
        <DropDown
          label='Proyecto:'
          name='proyecto'
          required={true}
          options={listaProyectos}
        />  
        <Input
          label='Fecha de Creación:'
          type='date'
          name='fecha'
          required={true}
        />
        <Input
          label='Descripción:'
          type='text'
          name='descripcion'
          required={true}
        />
       
        <div className='flex'>
          <div className ="mr-10">
          <ButtonLoading
            disabled={Object.keys(formData).length === 0}
            loading={mutationLoading}
            text='Confirmar'
          />
          </div>
          <Link to='/avances'>
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
  
      
        
    )
}

export default CrearAvance;
