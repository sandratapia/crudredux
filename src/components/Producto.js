import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { borrarProductoAction, obtenerProductoEditar } from '../actions/productoActions.js';
import Swal from 'sweetalert2';

const Producto = ({ producto }) => {
    const { nombre, precio, id } = producto;
    const dispatch = useDispatch();
    let navigate = useNavigate();

    //CONFIRMAR SI DESEA ELIMINARLO
    const confirmarEliminarProducto = id => {
        //PREGUNTAR AL USUARIO
        Swal.fire({
            title: '¿Estás seguro que deseas eliminar el producto?',
            text: 'Si lo eliminas no se podrá revertir el cambio.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, deseo eliminarlo'
        }).then((result) => {
            if (result.value) {
                //PASARLO AL ACTION
                dispatch(borrarProductoAction(id))
            }
        })

    }

    const redireccionarEdicion = producto => {
        dispatch(obtenerProductoEditar(producto))
        navigate(`/productos/editar/${producto.id}`);
    }

    return (
        <tr key={id} className="align-middle">
            <td className="align-middle">{nombre}</td>
            <td className="align-middle"><span className="font-weight-bold">$ {precio}</span></td>
            <td className="acciones">
                <button type="button" className="btn btn-primary mr-2" onClick={() => redireccionarEdicion(producto)}>
                    Editar
                </button>
                <button type="button" className="btn btn-danger" onClick={() => confirmarEliminarProducto(id)}>Eliminar</button>
            </td>
        </tr>
    )
}

export default Producto