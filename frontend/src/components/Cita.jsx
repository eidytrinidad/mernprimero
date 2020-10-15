import React, { useState,useEffect  } from "react";
import { useParams, Link, withRouter } from "react-router-dom";
import clienteAxios from "../config/axios";
import Swal from 'sweetalert2'

const Cita = ({ history, setConsulta }) => {
  const { id } = useParams();
  const [cita, setDatos] = useState([]);

  const infoCita = async () => {
    const { data } = await clienteAxios.get(`/pacientes/${id}`)
    setDatos(data);
  };

  useEffect(() => {
    infoCita();

  }, []);

  const eliminarCita = (id) => {
    //Alerta
    Swal.fire({
        title: 'Estas Seguro?',
        text: "Una Cita No Se Puede Recuperar!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!',
        cancelButtonText: 'Cancelar'

      }).then(async (result) => {
        if (result.isConfirmed) {

            //Alerta de Eliminados
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )

          //Eliminado
          await clienteAxios.delete(`pacientes/${id}`);
          setConsulta(true);
          history.push("/");
        }
      })
  };

  return (
    <>
      <h1 className="my-5">Nombre Cita: {cita.nombre}</h1>
      <div className="container mt-5 py-5">
        <div className="row">
          <div className="col-12 mb-5 d-flex justify-content-center">
            <Link
              to="/"
              href="#"
              className="btn btn-success text-uppercase py-2 px-5 font-weight-bold"
            >
              Volver
            </Link>
          </div>
          <div className="col-md-8 mx-auto">
            <div className="list-group">
              <div className="p-5 list-group-item list-group-item-action flex-column align-items-center">
                <div className="d-flex w-100 justify-content-between mb-4">
                  <h3 className="mb-3">{cita.nombre}</h3>
                  <small className="fecha-alta">
                    {cita.fecha} - {cita.hora}
                  </small>
                </div>

                <p className="mb-0">{cita.sintomas}</p>

                <div className="contacto py-3">
                  <p>Dueño: {cita.propietario}</p>
                  <p>Telefono: {cita.telefono}</p>
                </div>

                <div className="d-flex">
                  <button
                    onClick={() => eliminarCita(cita._id)}
                    className="btn btn-danger text-uppercase py-2 px-5 font-weight-bold col"
                  >
                    Eliminar <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Cita);
