import React from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROYECTO } from "graphql/proyectos/queries";
import ButtonLoading from "components/ButtonLoading";
import { toast } from "react-toastify";

const VerProyecto = () => {
  const { _id } = useParams();

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_PROYECTO, {
    variables: { _id },
  });

  console.log(queryData);

  useEffect(() => {
    if (queryError) {
      toast.error("Error consultando el proyecto");
    }
  }, [queryError]);

  if (queryLoading) return <div>Cargando....</div>;

  return (
    <div className="flex flex-col w-full h-full items-center">
      <Link to="/proyectos">
        <i className="fas fa-arrow-left mr-96 mt-7 text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900" />
      </Link>
      <h1 className="m-4 text-2xl font-bold text-center">
        Detalle del Proyecto
      </h1>
      <form className="flex flex-col items-right justify-center">
        <label htmlFor="nombre" className="flex flex-col my-3">
          <span className="font-bold">Nombre del proyecto:</span>
          <input
            type="text"
            className="input"
            defaultValue={queryData.Proyecto.nombre}
            disabled
          />
        </label>
        <label htmlFor="presupuesto" className="flex flex-col my-3">
          <span className="font-bold">Presupuesto:</span>
          <input
            type="text"
            className="input"
            defaultValue={queryData.Proyecto.presupuesto}
            disabled
          />
        </label>
        <label htmlFor="Fecha de inicio" className="flex flex-col my-3">
          <span className="font-bold">Fecha de inicio:</span>
          <input
            type="text"
            className="input"
            defaultValue={
              queryData.Proyecto.fechaInicio != null
                ? queryData.Proyecto.fechaInicio.slice(0, -14)
                : queryData.Proyecto.fechaInicio
            }
            disabled
          />
        </label>
        <label htmlFor="Fecha de fin" className="flex flex-col my-3">
          <span className="font-bold">Fecha de finalización:</span>
          <input
            type="text"
            className="input"
            defaultValue={
              queryData.Proyecto.fechaFin != null
                ? queryData.Proyecto.fechaFin.slice(0, -14)
                : queryData.Proyecto.fechaFin
            }
            disabled
          />
        </label>
        <label htmlFor="Estado" className="flex flex-col my-3">
          <span className="font-bold">Estado del proyecto:</span>
          <input
            type="text"
            className="input"
            defaultValue={queryData.Proyecto.estado}
            disabled
          />
        </label>
        <label htmlFor="Fase" className="flex flex-col my-3">
          <span className="font-bold">Fase del proyecto:</span>
          <input
            type="text"
            className="input"
            defaultValue={queryData.Proyecto.fase}
            disabled
          />
        </label>
        <label htmlFor="lider" className="flex flex-col my-3">
          <span className="font-bold">Lider del proyecto:</span>
          <input
            type="text"
            className="input"
            defaultValue={queryData.Proyecto.lider.nombre}
            disabled
          />
        </label>
        <label htmlFor="identificacionLider" className="flex flex-col my-3">
          <span className="font-bold">
            Identificación del lider del proyecto:
          </span>
          <input
            type="text"
            className="input"
            defaultValue={queryData.Proyecto.lider.identificacion}
            disabled
          />
        </label>
        <div className="">
          <span className="font-bold">Objetivos del proyecto:</span>
          <div className="">
            {queryData.Proyecto.objetivos.map((objetivo) => {
              return (
                <Objetivos
                  tipo={objetivo.tipo}
                  descripcion={objetivo.descripcion}
                />
              );
            })}
          </div>
        </div>
        <div className="flex justify-center">
          <Link to="/proyectos">
            <ButtonLoading text="Regresar" />
          </Link>
        </div>
      </form>
    </div>
  );
};

const Objetivos = ({ tipo, descripcion }) => {
  return (
    <div className="flex flex-row justify-between py-2">
      <span>{tipo}</span>
      <divspan>{descripcion}</divspan>
    </div>
  );
};


export default VerProyecto;