import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROYECTO } from "graphql/proyectos/queries";
import ButtonLoading from "components/ButtonLoading";
import useFormData from "hooks/useFormData";
import { toast } from "react-toastify";
import { EDITAR_PROYECTO, ACTIVAR_ESTADO, TERMINAR_PROYECTO, PROBLEMA_PROYECTO, ACTIVAR_PROYECTO, EDITAR_OBJETIVO,} from "graphql/proyectos/mutations";
import DropDown from "components/Dropdown";
import { Enum_EstadoProyecto, Enum_FaseProyecto, Enum_TipoObjetivo, } from "utils/enums";
import PrivateComponent from "components/PrivateComponent";
import Input from "components/Input";
import { useUser } from "context/userContext";
import {
  ProjectQueryContext,
  useProjectQuery,
} from "context/proyectQueryContext";
import { Dialog } from "@material-ui/core";

const EditarProyecto = () => {
  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams();
  const { userData } = useUser();

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
    refetch,
  } = useQuery(GET_PROYECTO, {
    variables: { _id },
  });

  console.log(queryData);

  const [
    editarProyecto,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(EDITAR_PROYECTO);

  const [
    activarEstado,
    {
      data: mutationDataActivar,
      loading: mutationLoadingActivar,
      error: mutationErrorActivar,
    },
  ] = useMutation(ACTIVAR_ESTADO);

  const [
    terminarProyecto,
    {
      data: mutationDataTerminar,
      loading: mutationLoadingTerminar,
      error: mutationErrorTerminar,
    },
  ] = useMutation(TERMINAR_PROYECTO);

  const [
    problemaProyecto,
    {
      data: mutationDataProblema,
      loading: mutationLoadingProblema,
      error: mutationErrorProblema,
    },
  ] = useMutation(PROBLEMA_PROYECTO);

  const [
    activarProyecto,
    {
      data: mutationDataProyecto,
      loading: mutationLoadingProyecto,
      error: mutationErrorProyecto,
    },
  ] = useMutation(ACTIVAR_PROYECTO);

  const submitForm = (e) => {
    e.preventDefault();
    console.log("fd", formData);

    if (formData.estado === "ACTIVO" && formData.fase === "NULO") {
      activarEstado({ variables: { _id } });
    } else if (formData.estado === "ACTIVO" && formData.fase === "TERMINADO") {
      terminarProyecto({ variables: { _id } });
    } else if (formData.estado === "INACTIVO") {
      problemaProyecto({ variables: { _id } });
    } else if (formData.estado === "ACTIVO") {
      activarProyecto({ variables: { _id } });
    }

    if (userData.rol === "LIDER") {
      formData.presupuesto = parseFloat(formData.presupuesto);
      editarProyecto({
        variables: {
          _id,
          campos: formData,
        },
      });
    }
  };

  useEffect(() => {
    if (
      mutationData ||
      mutationDataActivar ||
      mutationDataTerminar ||
      mutationDataProblema ||
      mutationDataProyecto
    ) {
      toast.success("Proyecto modificado correctamente");
      window.location.href = "/proyectos";
    }
  }, [
    mutationData,
    mutationDataActivar,
    mutationDataTerminar,
    mutationDataProblema,
    mutationDataProyecto,
  ]);

  useEffect(() => {
    if (
      mutationError ||
      mutationErrorActivar ||
      mutationErrorTerminar ||
      mutationErrorProblema ||
      mutationDataProyecto
    ) {
      toast.error("Error modificando el proyecto");
    }

    if (queryError) {
      toast.error("Error consultando el proyecto");
    }
  }, [
    queryError,
    mutationError,
    mutationErrorActivar,
    mutationErrorTerminar,
    mutationErrorProblema,
    mutationDataProyecto,
  ]);

  if (queryLoading) return <div>Cargando....</div>;

  return (
    <ProjectQueryContext.Provider value={{ queryData, refetch }}>
      <div className="flex flex-col w-full h-full items-center">
        <Link to="/proyectos">
          <i className="fas fa-arrow-left mr-96 mt-7 text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900" />
        </Link>
        <h1 className="m-4 text-2xl font-bold text-center">Editar Proyecto</h1>
        <form
          onSubmit={submitForm}
          onChange={updateFormData}
          ref={form}
          className="flex flex-col items-right justify-center"
        >
          <PrivateComponent roleList={"ADMINISTRADOR"}>
            <label htmlFor="nombre" className="flex flex-col my-3">
              <span className="font-bold">Nombre del proyecto:</span>
              <input
                type="text"
                name="nombre"
                defaultValue={queryData.Proyecto.nombre}
                disabled
              />
            </label>
          </PrivateComponent>
          <PrivateComponent roleList={"LIDER"}>
            <Input
              label="Nombre del proyecto:"
              type="text"
              name="nombre"
              defaultValue={queryData.Proyecto.nombre}
              required={true}
            />
          </PrivateComponent>
          <PrivateComponent roleList={"ADMINISTRADOR"}>
            <label htmlFor="presupuesto" className="flex flex-col my-3">
              <span className="font-bold">Presupuesto:</span>
              <input
                type="text"
                name="presupuesto"
                defaultValue={queryData.Proyecto.presupuesto}
                disabled
              />
            </label>
          </PrivateComponent>
          <PrivateComponent roleList={"LIDER"}>
            <Input
              label="Presupuesto del proyecto:"
              type="text"
              name="presupuesto"
              defaultValue={queryData.Proyecto.presupuesto}
              required={true}
            />
          </PrivateComponent>
          <label htmlFor="Fecha de inicio" className="flex flex-col my-3">
            <span className="font-bold">Fecha de inicio:</span>
            <input
              type="text"
              name="fechaInicio"
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
              name="fechaFin"
              defaultValue={
                queryData.Proyecto.fechaFin != null
                  ? queryData.Proyecto.fechaFin.slice(0, -14)
                  : queryData.Proyecto.fechaFin
              }
              disabled
            />
          </label>
          <PrivateComponent roleList={"ADMINISTRADOR"}>
            <DropDown
              label="Estado del proyecto:"
              name="estado"
              defaultValue={queryData.Proyecto.estado}
              required={true}
              options={Enum_EstadoProyecto}
            />
            <DropDown
              label="Fase del proyecto:"
              name="fase"
              defaultValue={queryData.Proyecto.fase}
              required={true}
              options={Enum_FaseProyecto}
            />
          </PrivateComponent>
          <PrivateComponent roleList={"LIDER"}>
            <label htmlFor="Estado" className="flex flex-col my-3">
              <span className="font-bold">Estado del proyecto:</span>
              <input
                type="text"
                name="estado"
                defaultValue={queryData.Proyecto.estado}
                disabled
              />
            </label>
            <label htmlFor="Fase" className="flex flex-col my-3">
              <span className="font-bold">Fase del proyecto:</span>
              <input
                type="text"
                name="fase"
                defaultValue={queryData.Proyecto.fase}
                disabled
              />
            </label>
            <div className="">
              <span className="font-bold">Objetivos del proyecto:</span>
              <div className="">
                {queryData.Proyecto.objetivos.map((objetivo, index) => {
                  return (
                    <Objetivos
                      index={index}
                      tipo={objetivo.tipo}
                      descripcion={objetivo.descripcion}
                      idProyecto={queryData.Proyecto._id}
                    />
                  );
                })}
              </div>
            </div>
          </PrivateComponent>
          <div className="flex">
            <div className="mr-10">
              <ButtonLoading
                disabled={Object.keys(formData).length === 0}
                loading={mutationLoading}
                text="Confirmar"
              />
            </div>
            <Link to="/proyectos">
              <ButtonLoading
                disabled={Object.keys(formData).length === 0}
                loading={mutationLoading}
                text="Cancelar"
              />
            </Link>
          </div>
        </form>
      </div>
    </ProjectQueryContext.Provider>
  );
};

const Objetivos = ({ idProyecto, tipo, descripcion, index }) => {
  const [mostrarDialogoEditar, setMostrarDialogoEditar] = useState(false);

  return (
    <div className="flex flex-row justify-between py-2">
      <span>{tipo}</span>
      <span className="">{descripcion}</span>
      <div >
        <i
          onClick={() => setMostrarDialogoEditar(true)}
          className="fas fa-pen text-yellow-600 hover:text-yellow-400 cursor-pointer"
        />
      </div>
      <Dialog
        open={mostrarDialogoEditar}
        onClose={() => setMostrarDialogoEditar(false)}
      >
        <EditarObjetivo
          descripcion={descripcion}
          tipo={tipo}
          index={index}
          idProyecto={idProyecto}
          setMostrarDialogoEditar={setMostrarDialogoEditar}
        />
      </Dialog>
    </div>
  );
};

const EditarObjetivo = ({
  descripcion,
  tipo,
  index,
  idProyecto,
  setMostrarDialogoEditar,
}) => {
  const { refetch } = useProjectQuery();
  const { form, formData, updateFormData } = useFormData();

  const [editarObjetivo, { data: dataMutation, loading }] =
    useMutation(EDITAR_OBJETIVO);

  useEffect(() => {
    if (dataMutation) {
      refetch();
      toast.success("Objetivo modificado correctamente");
      setMostrarDialogoEditar(false);
    }
  }, [dataMutation, refetch]);

  const submitForm = (e) => {
    e.preventDefault();
    editarObjetivo({
      variables: {
        idProyecto,
        indexObjetivo: index,
        campos: formData,
      },
    });
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Editar Objetivo</h1>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <DropDown
          label="Tipo de objetivo"
          name="tipo"
          required={true}
          options={Enum_TipoObjetivo}
          defaultValue={tipo}
        />
        <Input
          label="Descripcion del objetivo"
          name="descripcion"
          required={true}
          defaultValue={descripcion}
        />
        <ButtonLoading text="Confirmar" disabled={false} loading={loading} />
      </form>
    </div>
  );
};

export default EditarProyecto;