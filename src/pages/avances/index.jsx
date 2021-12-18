import React from 'react';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from "react";
import { GET_AVANCES } from 'graphql/avances/queries';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import PrivateComponent from 'components/PrivateComponent';
import PrivateRoute from 'components/PrivateRoute';

const IndexAvances = () => {
  const { data: queryData, error, loading } = useQuery(GET_AVANCES);
  const[busqueda, setBusqueda] = useState('');
  const[filtro, setFiltro] = useState([]);

  useEffect(() => {
    console.log("data servidor", queryData);
    if(queryData){
      queryData.avanceLider.forEach((elemento)=>{
        filtro.push(elemento);         
      });
    }
    console.log("aqui entra 1",filtro);
  }, [queryData]);

  useEffect(()=>{

    console.log(busqueda)
    if(queryData){
      setFiltro(queryData.avanceLider.filter(elemento=>{
        console.log("Elemento Normal", elemento);
        console.log("Elemento Stringify", JSON.stringify(elemento));
        return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());       
       }));
    } 
    console.log("aqui entra 2", filtro)

   },[busqueda, queryData]);


  useEffect(() => {
    if (error) {
      toast.error("Error consultando los avances");
    }
  }, [error]);

  if (loading) return <div>Cargando....</div>;


  return (
    <PrivateRoute roleList={['LIDER','ESTUDIANTE']}>
      <div className="mt-28 ml-14 mr-14">
        <div className="mb-3">
         <h2 className='text-2xl font-bold'>Listado de Avances</h2>
          <div className="flex flex-row justify-end">
            <input
                  onChange ={e=>setBusqueda(e.target.value)}
                  value={busqueda}
                  placeholder="Buscar"
                  className="border-2 border-gray-700 px-3 py-1 mr-2 rounded-md focus:outline-none focus:border-indigo-200"
            />
            <PrivateComponent roleList={'ESTUDIANTE'}>
            <div className="sidebar-col text-white border-gray-700 px-2 py-1 rounded-md">
              <Link to={`/avances/crear`}>
              <i class="fas fa-folder-plus text-white hover:text-blue-400 cursor-pointer"></i>
              </Link>
            </div>
          </PrivateComponent>
          </div>
        </div>
        <table className='tabla'>
          <thead>
            <tr>
              <th className='rounded-tl-xl'>Nombre proyecto</th>
              <th>Fecha</th>
              <th>Descripción</th>
              <th className="rounded-tr-xl"></th>
            </tr>
          </thead>
          <tbody>
            {filtro.map((u) => {
                return (
                  <tr key={u._id}>
                    <td>{u.proyecto.nombre}</td>
                    <td>{u.fecha.slice(0, -14)}</td> 
                    <td>{u.descripcion}</td>                   
                    <td className="space-x-4">
                      <Link to={`/avances/ver/${u._id}`}>
                        <i className='fas fa-eye text-blue-900 hover:text-blue-400 cursor-pointer' />
                        </Link>
                      <Link to={`/avances/editar/${u._id}`}>
                        <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer pl-4'/>
                        </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </PrivateRoute>
  );
};

export default IndexAvances;