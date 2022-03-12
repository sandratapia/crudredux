// @ts-nocheck
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
//ACTIONS DE REDUX
import { crearNuevoProductoAction } from '../actions/productoActions';
import { mostrarAlerta, ocultarAlertaAction } from '../actions/alertaActions.js';

const NuevoProducto = () => {
    //STATE DEL COMPONENTE
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState(0);

    //UTILIZAR USEDISPATCH Y TE CREA UNA FUNCION
    const dispatch = useDispatch();

    //ACCEDER AL STATE DEL STORE   
    const cargando = useSelector(state => state.productos.loading);
    const error = useSelector(state => state.productos.error);
    const alerta = useSelector(state => state.alerta.alerta);

    const agregarProducto = producto => dispatch(crearNuevoProductoAction(producto));


    let navigate = useNavigate();
    //CUANDO EL USUARIO HAGA SUBMIT
    const submitNuevoProducto = event => {
        event.preventDefault();
        //VALIDAR FORMULARIO
        if (nombre.trim() === '' || precio <= 0) {
            const alerta = {
                msg: 'Ambos campos son obligatorios',
                class: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(mostrarAlerta(alerta));

            return;
        }

        //SI NO HAY ERRORES
        dispatch(ocultarAlertaAction());
        //CREAR EL NUEVO PRODUCTO
        agregarProducto({
            nombre,
            precio
        });

        //REDIRECCIONAR

        navigate("/");
    }

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-8">
                <div className="card px-5 pb-4">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">Agregar Nuevo Producto</h2>
                    </div>
                    {alerta ? <p className={alerta.class}>{alerta.msg}</p> : null}
                    <form onSubmit={submitNuevoProducto}>
                        <div className="form-group">
                            <label htmlFor="nombre" className="form-label ms-8">Nombre Producto</label>
                            <input type="text" id="nombre" placeholder="Nombre Producto" className="form-control ms-8" value={nombre} onChange={(event) => setNombre(event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="precio" className="form-label">Precio Producto</label>
                            <input type="number" id="precio" placeholder="Precio Producto" className="form-control" value={precio} onChange={(event) => setPrecio(Number(event.target.value))} />
                        </div>
                        <input type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100" value="Agregar" />
                    </form>

                    {cargando ? <p>Cargando...</p> : null}
                    {error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null}
                </div>
            </div>
        </div>
    )
}

export default NuevoProducto