import Menu from './menu';
import Login from './login';
import React, { useState, useEffect } from 'react';
import {
      useNavigate,
      Outlet
} from 'react-router-dom';
import {borrarCookie, valorCookie} from '../Funciones';


// hacer algo más interesante después
export default function Home(props) {
      borrarCookie("usuario");
      const cookieValue = valorCookie("usuario");
      console.log(cookieValue);
      console.log(props.nomCentro);
      let navigate = useNavigate();
      
      if (!cookieValue || cookieValue == null || cookieValue == ''){
          
            return <Login nomCentro={props.nomCentro} setEstado={props.setEstado}/>;
      } else {
            return <Menu nomCentro={props.nomCentro} res={props.residentes}/>;
      }
      //cometnariosdasda

}
