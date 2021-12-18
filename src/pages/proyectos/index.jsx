import React from "react";
import { GET_PROYECTOS } from "graphql/proyectos/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Enum_EstadoProyecto, Enum_FaseProyecto } from "utils/enums";
import { Link } from "react-router-dom";
import PrivateComponent from "components/PrivateComponent";
import { Tooltip } from "@material-ui/core";
import { CREAR_INSCRIPCION } from "graphql/inscripciones/mutations";
import { useUser } from "context/userContext";
import ButtonLoading from "components/ButtonLoading";

const IndexProyectos = () => {
  const { data: queryData, error, loading } = useQuery(GET_PROYECTOS);
  const[busqueda, setBusqueda] = useState('');
  const[filtro, setFiltro] = useState([]);

  useEffect(() => {
    console.log("data servidor", queryData);
    if(queryData){
      queryData.Proyectos.forEach((elemento)=>{
        filtro.push(elemento);         
      });
    }
    console.log("aqui entra 1",filtro);

  }, [queryData]);

  useEffect(()=>{
    console.log(busqueda)
    if(queryData){
      setFiltro(queryData.Proyectos.filter(elemento=>{
        console.log("Elemento Normal", elemento);
        console.log("Elemento Stringify", JSON.stringify(elemento));
        return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());       
       }));
    } 

    console.log("aqui entra 2", filtro)
    
   },[busqueda, queryData]);





  useEffect(() => {
    if (error) {
      toast.error("Error consultando los proyectos");
    }
  }, [error]);

  if (loading) return <div>Cargando....</div>;

  return (
    <div className="mt-28 ml-14 mr-14">
      <div className='mb-3'>
        <h2 className="text-2xl font-bold">Listado de Proyectos</h2>
        <div className="flex flex-row justify-end">
            <input
              onChange ={e=>setBusqueda(e.target.value)}
              value={busqueda} 
              placeholder="Buscar"
              className="border-2 border-gray-700 px-3 py-1 mr-2 rounded-md focus:outline-none focus:border-indigo-200"
            />
            <PrivateComponent roleList={"LIDER"}>
              <div className="sidebar-col text-white border-gray-700 px-2 py-1 rounded-md">
                <Link to={"/proyectos/crear"}>
                  <i class="fas fa-folder-plus text-white hover:text-blue-400 cursor-pointer"></i>
                </Link>
              </div>
            </PrivateComponent>
          </div>
      </div>
      <table className="tabla">
        <thead>
          <tr>
            <th className="rounded-tl-xl">Nombre</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Presupuesto</th>
            <th>Estado</th>
            <th>Fase</th>
            <th class="rounded-tr-xl"></th>
          </tr>
        </thead>
        <tbody>
          {filtro.map((u) => {
              return (
                <tr key={u._id}>
                  <td>{u.nombre}</td>
                  <td>
                    {u.fechaInicio != null
                      ? u.fechaInicio.slice(0, -14)
                      : u.fechaInicio}
                  </td>
                  <td>
                    {u.fechaFin != null ? u.fechaFin.slice(0, -14) : u.fechaFin}
                  </td>
                  <td>{u.presupuesto}</td>
                  <td>{Enum_EstadoProyecto[u.estado]}</td>
                  {console.log(u.estado.toString() === "INACTIVO")}
                  <td>{Enum_FaseProyecto[u.fase]}</td>
                  <td className="space-x-4">
                    <Link to={`/proyectos/ver/${u._id}`}>
                      <i class="far fa-eye text-blue-900 hover:text-blue-400 cursor-pointer"></i>
                    </Link>
                    <PrivateComponent roleList={["ADMINISTRADOR", "LIDER"]}>
                      <Link to={`/proyectos/editar/${u._id}`}>
                        <i className="fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer pl-4" />
                      </Link>
                    </PrivateComponent>
                    <PrivateComponent roleList={"ESTUDIANTE"}>
                      <InscripcionProyecto
                        idProyecto={u._id}
                        estado={u.estado}
                        inscripciones={u.inscripciones}
                      />
                    </PrivateComponent>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

const InscripcionProyecto = ({ idProyecto, estado, inscripciones }) => {
  const [estadoInscripcion, setEstadoInscripion] = useState("");
  const [crearInscripcion, { data, loading, error }] =
    useMutation(CREAR_INSCRIPCION);
  const { userData } = useUser();

  useEffect(() => {
    if (userData && inscripciones) {
      const flt = inscripciones.filter(
        (el) => el.estudiante._id === userData._id
      );
      if (flt.length > 0) {
        setEstadoInscripion(flt[0].estado);
      }
    }
  }, [userData, inscripciones]);

  useEffect(() => {
    if (data) {
      console.log(data);
      toast.success("Inscripción creada con éxito");
    }
  }, [data]);

  const confirmarInscripcion = () => {
    crearInscripcion({
      variables: { proyecto: idProyecto, estudiante: userData._id },
    });
  };

  return (
    <>
    {estadoInscripcion !== '' ? (
      // <span>Inscrito: {estadoInscripcion}</span>
      <> </>
    ) : (
      <ButtonLoading
        onClick={() => confirmarInscripcion()}
        disabled={estado.toString() === "INACTIVO"}
        loading={loading}
        text="Inscribirme"
      />
    )}
    </>
    // <Tooltip title="Inscribirme a este proyecto" arrow>
    //   <button
    //     onClick={() => confirmarInscripcion()}
    //     className="fas fa-user-plus text-blue-900 hover:text-blue-400 cursor-pointer pl-4"
    //     disabled={estado.toString() === "INACTIVO"}
    //   ></button>
    // </Tooltip>
  );

};

export default IndexProyectos;