import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USUARIOS } from 'graphql/usuarios/queries';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Enum_Rol, Enum_EstadoUsuario } from 'utils/enums';
import PrivateRoute from 'components/PrivateRoute';

const IndexUsuarios = () => {
  const { data, error, loading } = useQuery(GET_USUARIOS);
  const[busqueda, setBusqueda] = useState('');
  const[filtro, setFiltro] = useState([]); 

  useEffect(() =>{       
      console.log('data servidor', data);
      
      if(data){
        data.Usuarios.forEach((elemento)=>{
          filtro.push(elemento);         
        });
      }
      console.log("aqui entra 1",filtro);
     
   }, [data]);

   useEffect(()=>{

     console.log(busqueda)
     if(data){
       setFiltro(data.Usuarios.filter(elemento=>{
         console.log("Elemento Normal", elemento);
         console.log("Elemento Stringify", JSON.stringify(elemento));
         return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());       
        }));
     } 
     console.log("aqui entra 2", filtro)

    },[busqueda, data]);

  useEffect(() => {
    if (error) {
      toast.error('Error consultando los usuarios');
    }
  }, [error]);

  if (loading) return <div>Cargando....</div>;

  return (
    <PrivateRoute roleList={['ADMINISTRADOR','LIDER']}>
    <div className= 'mt-28 ml-14 mr-14'>
      <div className='mb-3'>     
        <h2 className =' text-2xl font-bold'>Listado de Usuarios</h2>
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
            <th className='rounded-tl-xl'>Nombre</th>
            <th>Apellidos</th>
            <th>Correo Electrónico</th>
            <th>Identificación</th>
            <th>Rol</th>
            <th>Estado</th>
            <th className="rounded-tr-xl"></th>
          </tr>
        </thead>
        <tbody>
          {filtro.map((u) => {
              return (
                <tr key={u._id}>
                  <td>{u.nombre}</td>
                  <td>{u.apellido}</td>
                  <td>{u.correo}</td>
                  <td>{u.identificacion}</td>
                  <td>{Enum_Rol[u.rol]}</td>
                  <td>{Enum_EstadoUsuario[u.estado]}</td>
                  <td>
                    <Link to={`/usuarios/editar/${u._id}`}>
                      <i className='fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer' />
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

export default IndexUsuarios;
