// @ts-nocheck
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { editarProductoAction } from '../actions/productoActions.js';

const EditarProducto = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    //NUEVO STATE DE PRODUCTO
    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: '',
    })
    //PRODUCTO A EDITAR
    const productoeditar = useSelector(state => state.productos.productoeditar);

    //LLENAR EL STATE AUTOMATICAMENTE

    useEffect(() => {
        guardarProducto(productoeditar);
    }, [productoeditar]);


    //LEER LOS DATOS DEL FORMULARIO
    const onChangeFormulario = event => {
        guardarProducto({
            ...producto,
            [event.target.name]: event.target.value
        })
        console.log(event.target)
    }

    const { nombre, precio } = producto;

    const submitEditarProducto = event => {
        event.preventDefault();
        dispatch(editarProductoAction(producto));
        navigate("/");
    }

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-8">
                <div className="card px-5 pb-4">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">Editar Producto</h2>
                    </div>
                    <form onSubmit={submitEditarProducto}>
                        <div className="form-group">
                            <label htmlFor="nombre" className="form-label ms-8">Nombre Producto</label>
                            <input type="text" id="nombre" placeholder="Nombre Producto" name="nombre" className="form-control ms-8" defaultValue={nombre} onChange={onChangeFormulario} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="precio" className="form-label">Precio Producto</label>
                            <input type="number" id="precio" placeholder="Precio Producto" name="precio" className="form-control" defaultValue={precio} onChange={onChangeFormulario} />
                        </div>
                        <input type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100" value="Guardar Cambios" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditarProducto