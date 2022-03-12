// @ts-nocheck
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { obtenerProductosAction } from '../actions/productoActions.js';
import Producto from './Producto.js';

const Productos = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        // Consultar la api
        const cargarProductos = () => dispatch(obtenerProductosAction());
        cargarProductos();
        // eslint-disable-next-line
    }, []);

    //OBTENER EL STATE PARA PINTARLO
    const productos = useSelector(state => state.productos.productos);
    const error = useSelector(state => state.productos.error);
    const cargando = useSelector(state => state.productos.loading);

    return (
        <>
            <h2 className="text-center my-5">Listado de Productos</h2>
            {error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Ha habido un error, no se puede cargar el listado de productos</p> : null}
            {cargando ? <p className="text-center">Cargando...</p> : null}
            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.length === 0 ? (<p className="mt-3">No hay productos</p>) : (
                        productos.map(producto => (
                            <Producto
                                key={producto.id}
                                producto={producto}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </>
    )
}

export default Productos