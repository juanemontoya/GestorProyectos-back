import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_INSCRIPCIONES } from 'graphql/inscripciones/queries';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';
import PrivateComponent from 'components/PrivateComponent';

const IndexInscripciones = () => {
  const { data, error, loading } = useQuery(GET_INSCRIPCIONES);
  const[busqueda, setBusqueda] = useState('');
  const[filtro, setFiltro] = useState([]);

  useEffect(() =>{       
      console.log('data servidor', data);
      if(data){
        data.Inscripciones.forEach((elemento)=>{
          filtro.push(elemento);         
        });
      }
      console.log("aqui entra 1",filtro);     
   }, [data]);

   useEffect(()=>{
    console.log(busqueda)
    if(data){
      setFiltro(data.Inscripciones.filter(elemento=>{
        console.log("Elemento Normal", elemento);
        console.log("Elemento Stringify", JSON.stringify(elemento));
        return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());       
       }));
    } 

    console.log("aqui entra 2", filtro)
    
   },[busqueda, data]);


  useEffect(() => {
    if (error) {
      toast.error('Error consultando las inscripciones');
    }
  }, [error]);

  if (loading) return <div>Cargando....</div>;

  return (
    <PrivateRoute roleList={['LIDER','ESTUDIANTE']}>
    <div className= 'mt-28 ml-14 mr-14'>
      <div className='mb-3'>     
        <h2 className =' text-2xl font-bold'>Listado de Inscripciones</h2>
        <div className='flex flex-row justify-end'>         
          <input
            onChange ={e=>setBusqueda(e.target.value)}
            value={busqueda} 
            placeholder='Buscar' 
            className='border-2 border-gray-700 px-3 py-1 rounded-md focus:outline-none focus:border-indigo-200'/>
        </div> 
      </div>
      <table className='tabla'>
        <thead>
          <tr>
          <PrivateComponent roleList={['LIDER']}>
            <th className='rounded-tl-xl'>Nombre</th>
            <th>Apellidos</th>
            <th>Proyecto</th>
            </PrivateComponent>
            <PrivateComponent roleList={['ESTUDIANTE']}>
            <th className='rounded-tl-xl'>Proyecto</th>
            </PrivateComponent>
            <th>Estado Inscripción</th>
            <th>Fecha de Ingreso</th>
            <PrivateComponent roleList={['ESTUDIANTE']}>
            <th className="rounded-tr-xl">Fecha de Egreso</th>
            </PrivateComponent>
            <PrivateComponent roleList={['LIDER']}>
            <th>Fecha de Egreso</th>
            <th className="rounded-tr-xl"></th>
            </PrivateComponent>
          </tr>
        </thead>
        <tbody>
          {filtro.map((u) => {
                   return (
                <tr key={u._id}>
                   <PrivateComponent roleList={['LIDER']}>
                   <td>{u.estudiante.nombre}</td>
                   <td>{u.estudiante.apellido}</td>                
                   <td>{u.proyecto.nombre}</td>
                   </PrivateComponent>
                   <PrivateComponent roleList={['ESTUDIANTE']}>
                   <td>{u.proyecto.nombre}</td>
                   </PrivateComponent>
                   <td>{u.estado}</td>
                   <td>{u.fechaIngreso!=null? u.fechaIngreso.slice(0,-14):u.fechaIngreso}</td>
                   <td>{u.fechaEgreso!=null? u.fechaEgreso.slice(0,-14):u.fechaEgreso}</td>
                   <PrivateComponent roleList={['LIDER']}>          
                   <td>
                   <Link to={`/inscripciones/editar/${u._id}`}>
                     <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
                   </Link>
                    </td>
                   </PrivateComponent>
                </tr>
  
                  );            
            })}
        </tbody>
      </table>      
   </div>
    </PrivateRoute>
  );
};


export default IndexInscripciones;
