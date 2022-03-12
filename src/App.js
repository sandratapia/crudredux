import React from 'react';
import './index.css'
import Header from './components/Header.js';
import Productos from './components/Productos.js';
import NuevoProducto from './components/NuevoProducto.js';
import EditarProducto from './components/EditarProducto.js';
import { Routes, Route } from "react-router-dom";

//REDUX
import { Provider } from 'react-redux';
import store from './store';

function App() {

  return (
    <Provider store={store}>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Productos />} />
          <Route path="/productos/nuevo" element={<NuevoProducto />} />
          <Route path="/productos/editar/:id" element={<EditarProducto />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
