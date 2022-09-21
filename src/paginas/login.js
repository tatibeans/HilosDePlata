import Titulo from "../componentes/Titulo";
import PropTypes from "prop-types";
import React, { useState, useRef } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import Loading from "../componentes/Loading";
import ToastMessage from "../componentes/Toast";
import { Toast, Button } from "react-bootstrap";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useCookies } from "react-cookie";
import Box from "@mui/material/Box";

function Login(props) {
  const password = useRef(null);
  const cedula = useRef(null);
  const divContenedor = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [position, setPosition] = useState("top-center");

  let navigate = useNavigate();

  const manejarSubmit = async (e) => {
    e.preventDefault();
    const usu = await loguearUsuario(props.nomCentro, cedula, password);
  };

  async function loguearUsuario(nomCentro, cedula, password) {
    setIsLoading(true);
    const usuario = fetch(
      `https://proyectocalistoortapi.azurewebsites.net/api/PWA/LogIn?cedula=${
        cedula.current.value
      }&pass=${encriptar(password.current.value)}&centro=${nomCentro}`
    )
      .then((r) => r.json())
      .then(function (data) {
        if (data != null && data.TokenPWA != null) {
          if(data.Residentes == null || data.Residentes.length == 0 || data.Residentes == "undefined")
          {
            setMensaje("Usted no tiene ningún residente asociado.");
            setShow(true);
            setIsLoading(false);

          }else{
          document.cookie = `usuario=nombre:${data.Nombre}|cedula:${data.Cedula}|token:${data.TokenPWA}`;
          props.setEstado(data.Residentes);
          setMensaje("");
          setIsLoading(false);
          return navigate("/menu");
        }
        } else {
          setMensaje("Usuario y/o contraseña incorrectos.");
          setShow(true);
          setIsLoading(false);
        }
      });
  }

  function serializarFecha(fecha) {
    //2022-09-06T12:20:28.75
    let sinHora = fecha.split("T")[0];
    let numeros = sinHora.split("-");
    return numeros[2] + "/" + numeros[1] + "/" + numeros[0];
  }

  return (
    <div className="divHeader">
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="Auth-form-container" ref={divContenedor}>
        <ToastContainer className="p-3" position={position}>
          <Toast
            onClose={() => setShow(false)}
            autohide
            show={show}
            delay={3000}
          >
            <Toast.Header>
              <strong className="mr-auto">CalistoPWA -</strong>
              <small> Mensaje</small>
            </Toast.Header>
            <Toast.Body>{mensaje}</Toast.Body>
          </Toast>
        </ToastContainer>
        <form className="Auth-form" onSubmit={manejarSubmit}>
          <div className="Auth-form-content">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                height: "100%",
                width: "100%",
                border: 0,
              }}
            >
              <Box
                component="img"
                sx={{
                  height: "50%",
                  width: "50%",
                  border: 0,
                }}
                alt="Logo"
                src="192x192.png"
              />
            </Box>

            {/* <img src={"./img/192.png"} style={{ width: "50%" , heigth:"50%"}} /> */}
            <div className="form-group mt-3">
              <label>Cédula</label>
              <input
                type="text"
                className="form-control mt-1"
                id="txtCedula"
                placeholder="Ingrese su cédula sin puntos ni guiones"
                ref={cedula}
              />
            </div>
            <div className="form-group mt-3">
              <label>Contraseña</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Ingrese su contraseña"
                id="txtPass"
                ref={password}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" id="btnLogin">
                {isLoading ? <Loading /> : "Ingresar"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Box>
    </div>
  );
}

function encriptar(pass) {
  return pass;
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
