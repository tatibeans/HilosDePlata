import React, { useState, useLayoutEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './paginas/login';
import Menu from './paginas/menu';
import Alerta from './paginas/alerta';
import CambiarPass from './paginas/cambiarPass';
import Home from './paginas/Home';
import Insumos from './paginas/insumos';
import SignosVitales from './paginas/signosVitales';
import Tratamientos from './paginas/tratamientos';
import Estudios from './paginas/estudios';
import Consultas from './paginas/consultas';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';



const history = createBrowserHistory();
// const ResidentesContext = React.createContext({ residentes: [], setResidentes: () => {} });

function App(props) {
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  });
  const [residentes, setresidentes] = useState([]);

  const [activoCi, setActivoCi] = useState("");
  const [activoNom, setActivoNom] = useState("");
  const [activoUsu, setActivoUsu] = useState("");
  const [imgResidente, setImgResidente] = useState("");

  const modificarState = (e) => {
    if (e === null || e === "undefined"){
      setresidentes([]);
    } else {
      e.forEach(element => {
        setresidentes((current) => [...current, element]);
      }
      );
    }
    

  }



  const modUsuActivo = (e) => {
    console.log(e);
    setActivoUsu(e);
    setActivoNom(e.Nombre);
    setActivoCi(e.Cedula);
    if (e.Genero == "F") {
      setImgResidente("./img/abuela.jpg");
    } else {
      setImgResidente("./img/abuelito.jpg");
    }
  }


  useLayoutEffect(() => history.listen(setState), [history]);
  return (
    <React.StrictMode>
      <BrowserRouter
        location={state.location}
        navigationType={state.action}
        navigator={history}>
        <Routes>

          <Route exact path="/" element={<Home nomCentro={props.nomCentro} setEstado={modificarState} res={residentes} />} />
          <Route path="/alerta" element={<Alerta />} />
          <Route path="/cambiarPass" element={<CambiarPass />} />
          <Route path="/estudios" element={<Estudios />} />
          <Route path="/consultas" element={<Consultas />} />
          <Route path="/insumos" element={<Insumos />} />
          <Route path="/login" element={<Login nomCentro={props.nomCentro} setEstado={modificarState} />} />
          <Route path="/menu" element={<Menu nomCentro={props.nomCentro} res={residentes} modUsuActivo={modUsuActivo} activoUsu={activoUsu} imgResidente={imgResidente} modificarState={modificarState}/>} />
          <Route path="/signosVitales" element={<SignosVitales />} />
          <Route path="/tratamientos" element={<Tratamientos />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

function fetchResidentes() {
  // HACER!!
}

function fetchUsuario() {
  // HACER!!
}

function encriptar(pass) {
  // HACER!!
  return pass;
}

export default App;