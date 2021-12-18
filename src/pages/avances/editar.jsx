import React from 'react';
import { useState, useEffect } from 'react'
import { GET_AVANCE } from 'graphql/avances/queries';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { EDITAR_AVANCE, CREAR_OBSERVACION, EDITAR_OBSERVACION } from 'graphql/avances/mutations';
import ButtonLoading from 'components/ButtonLoading';
import PrivateComponent from 'components/PrivateComponent';
import useFormData from 'hooks/useFormData';
import { toast } from "react-toastify";
import Input from "components/Input";
import PrivateRoute from 'components/PrivateRoute';
import { nanoid } from 'nanoid';
import { Dialog } from "@material-ui/core";
import { useUser } from 'context/userContext';


const EditarAvance = () => {
  const { form, formData, updateFormData } = useFormData(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { userData } = useUser();
  const { _id } = useParams();

  const {
      data: queryData,
      error: queryError,
      loading: queryLoading,
  } = useQuery(GET_AVANCE, {
      variables: { _id },
  });

  console.log(queryData);

  const [
      editarAvance,
      { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDITAR_AVANCE);

  useEffect(() => {
      if (mutationData && userData.rol==='ESTUDIANTE') {
          toast.success("Avance modificado correctamessnte");
          window.location.href = "/avances";
      }
  }, [
      mutationData,
  ]);

  useEffect(() => {
      if (
          mutationError
      ) {
          toast.error("Error modificando el avance");
      }
      if (queryError) {
          toast.error("Error consultando el avance");
      }
  }, [
      queryError,
      mutationError
  ]);

  if (queryLoading) return <div>Cargando....</div>;

  const submitForm = (e) => {
      e.preventDefault();
      console.log("fd", formData);
      editarAvance({ variables: { _id, campos: formData, }, });
  };

 return (  

      <PrivateRoute roleList={['ESTUDIANTE','LIDER']}>
        <div className='flex flex-col w-full h-full items-center'>
          <Link to='/avances'>
            <i className='fas fa-arrow-left mr-96 mt-7 text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
          </Link>
          <h1 className='m-4 text-2xl font-bold text-center'>Editar Avance</h1>
          <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
            <Input
              label='Proyecto:'
              name='proyecto'
              defaultValue={queryData.detalleAvance.proyecto.nombre}
              disabled
            />  
            <Input
              label='Fecha:'
              type='date'
              name='fecha'
              defaultValue={queryData.detalleAvance.fecha.slice(0, -14)}
              disabled = {userData.rol==='ESTUDIANTE'? false:true} 
              
            />
            <Input
              label='Descripción:'
              type='text'
              name='descripcion'
              defaultValue={queryData.detalleAvance.descripcion}
              disabled = {userData.rol==='ESTUDIANTE'? false:true}              
            />
            <div>
              <div className="flex flex-row justify-between">
              <span className="font-bold">Observaciones del Lider</span>
              <PrivateComponent roleList={['LIDER']}>
              <button
                onClick={() => {
                  setOpenDialog(true);
                }}
                className='fas fa-plus fa-xs rounded-full bg-indigo-500 hover:bg-indigo-400 text-white p-2 mx-2 cursor-pointer'
                type='button'
              />
            </PrivateComponent>
            <Dialog
                open={openDialog}
                onClose={() => {
                  setOpenDialog(false);
                }}
              >
              <AgregarObservacion _id={queryData.detalleAvance._id} setOpenDialog={setOpenDialog} />
            </Dialog>            
            </div>  
              <div>{queryData.detalleAvance.observaciones.length === 0 ? (
                  <span> El avance no ha sido revisado por el líder del proyecto</span>
              ):(
              <>
              {queryData.detalleAvance.observaciones.map((observacion, index) => {
                  return (
                    <Observaciones
                      _id={queryData.detalleAvance._id} 
                      observacion={observacion}
                      index={index}
                    />
                  );
                })}
              </>
              )}                
              </div>              
            </div> 
            <PrivateComponent roleList={['ESTUDIANTE']}>
            <div className="flex">
            <div className="mr-10">
              <ButtonLoading
                disabled={Object.keys(formData).length === 0}
                loading={mutationLoading}
                text="Confirmar"
              />
            </div>
            <Link to="/avances">
              <ButtonLoading
                disabled={Object.keys(formData).length === 0}
                loading={mutationLoading}
                text="Cancelar"
              />
            </Link>
          </div>
          </PrivateComponent>
          <PrivateComponent roleList={['LIDER']}>
          <div className='flex justify-center'>
              <Link to='/avances'>
              <ButtonLoading text='Regresar'/>
              </Link>
            </div>
          </PrivateComponent>
          </form>
        </div>
      </PrivateRoute>

);

};

const Observaciones = ({ _id, observacion, index }) => {
  const [mostrarDialogoEditar, setMostrarDialogoEditar] = useState(false);
  return (
    <>
    <div className="flex flex-row justify-between py-2">
      <span key={nanoid()}>{index+1}.  {observacion}</span>
      <PrivateComponent roleList={['LIDER']}>
        <i
        onClick={() => setMostrarDialogoEditar(true)} 
        className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer pl-4' />
      </PrivateComponent>
    </div>
      <Dialog
      open={mostrarDialogoEditar}
      onClose={() => setMostrarDialogoEditar(false)}
    >
      <EdicionAvance
        _id= {_id}
        index={index}
        observacion={observacion}
        setMostrarDialogoEditar={setMostrarDialogoEditar}
      />
    </Dialog>
    </>
  );
};

const EdicionAvance = ({_id, observacion, index, setMostrarDialogoEditar}) => {
  const { form, formData, updateFormData } = useFormData();
  
  const [editarObservacion, { data: dataMutation, loading }] =
    useMutation(EDITAR_OBSERVACION, {
    refetchQueries: [GET_AVANCE, , {
      variables: { _id },
  }],
  });

  useEffect(() => {
    if (dataMutation) { 
      toast.success("Observación modificado correctamente");
      setMostrarDialogoEditar(false);
    }
  }, [dataMutation]);

  const submitForm = (e) => {
    e.preventDefault();
    console.log("Este es un formData", formData);
    editarObservacion({
      variables: {
        _id,
        indexObservacion: index,
        ...formData,
      },
    });
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Editar Observación</h1>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <Input
          name="observacion"
          required={true}
          defaultValue={observacion}
        />
        <ButtonLoading text="Confirmar" loading={loading} disabled={false} />
      </form>
    </div>
  );
};

const AgregarObservacion = ({ _id, setOpenDialog }) => {
  const { formData, form, updateFormData } = useFormData();

  const [crearObservacion, { loading }] = useMutation(CREAR_OBSERVACION, {
    refetchQueries: [GET_AVANCE, , {
      variables: { _id },
  }],
  });

  const submitForm = (e) => {
    e.preventDefault();
    crearObservacion({
      variables: {
        _id,
        ...formData,
      },
    })
      .then(() => {
        toast.success('Observación agregada exitosamente');
        setOpenDialog(false);
      })
      .catch(() => {
        toast.error('Error agregando observación');
      });
  };
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold text-gray-900'>
        Agregar Observacion
      </h1>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <div className='flex flex-col'>
          <Input name='observacion' type='text' required /> 
          <ButtonLoading
            text='Agregar observacion'
            loading={loading}
            disabled={Object.keys(formData).length === 0}
          />
        </div>
      </form>
    </div>
  );
};




export default EditarAvance;