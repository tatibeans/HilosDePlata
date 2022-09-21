import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const nombreCentro = "HilosDePlata";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App nomCentro={nombreCentro}/>
);

// const express = require('express');
// const path = require('path');
// const app = express();

// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// app.listen(9000);

serviceWorkerRegistration.register();

reportWebVitals();

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('service-worker.js');
}
