import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_AVANCE } from 'graphql/avances/queries';
import PrivateRoute from 'components/PrivateRoute';
import Input from 'components/Input';
import ButtonLoading from 'components/ButtonLoading';
import { toast } from 'react-toastify';
import { nanoid } from 'nanoid';

const VerAvance = () => {
  const{_id} = useParams();
    
  const{
      data: queryData,
      error: queryError,
      loading: queryLoading,
  } = useQuery(GET_AVANCE,{
      variables: { _id },
  });

  console.log(queryData);

  useEffect(() => {
      if(queryError){
          toast.error("Error consultado el avance");
      }
  }, [queryError]);

  if(queryLoading) return <div>Cargando...</div>

  return (  

      <PrivateRoute roleList={['ESTUDIANTE','LIDER']}>
        <div className='flex flex-col w-full h-full items-center'>
          <Link to='/avances'>
            <i className='fas fa-arrow-left mr-96 mt-7 text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
          </Link>
          <h1 className='m-4 text-2xl font-bold text-center'>Detalle del Avance</h1>
          <form className='flex flex-col items-right justify-center'>
            <Input
              label='Proyecto:'
              name='proyecto'
              defaultValue={queryData.detalleAvance.proyecto.nombre}
              disabled
            />  
            <Input
              label='Fecha:'
              type='text'
              name='fecha'
              defaultValue={queryData.detalleAvance.fecha.slice(0, -14)}
              disabled
            />
            <Input
              label='Descripción:'
              type='text'
              name='descripcion'
              defaultValue={queryData.detalleAvance.descripcion}
              disabled
            />
            <div>
              <span className="font-bold">Observaciones del Lider</span>
              <div>{queryData.detalleAvance.observaciones.length === 0 ? (
                  <span> El avance no ha sido revisado por el líder del proyecto</span>
              ):(
              <>
              {queryData.detalleAvance.observaciones.map((observacion, index) => {
                  return (
                    <Observaciones
                      observacion={observacion}
                      index={index}
                    />
                  );
                })}
              </>
              )}                
              </div>              
            </div>  
            
            <div className='flex justify-center'>
              <Link to='/avances'>
              <ButtonLoading text='Regresar'/>
              </Link>
            </div>
          </form>
        </div>
      </PrivateRoute>

);

};

const Observaciones = ({ observacion, index }) => {
  return (
    <div className="flex flex-row justify-between py-2">
      <span key={nanoid()}>{index+1}.  {observacion}</span>
    </div>
  );
};
export default VerAvance;