import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITADO_ERROR,
    PRODUCTO_EDITADO_EXITO,
    COMENZAR_EDICION_PRODUCTO
} from '../types/index.js';
import clienteAxios from '../config/axios.js';
import Swal from 'sweetalert2';

//CREAR NUEVOS PRODUCTOS
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch(agregarProducto());

        try {
            //INSERTAR EN LA API
            await clienteAxios.post('/productos', producto)
            //SI TODO SALE BIEN, ACTUALIZA EL STATE
            dispatch(agregarProductoExito(producto))
            //ALERTA
            Swal.fire(
                'Correcto',
                'El producto se ha agregado correctamente.',
                'success'
            )
        } catch (error) {
            console.log(error);
            //SI HAY UN ERROR CAMBIAR EL STATE
            dispatch(agregarProductoError(true))
            //ALERTA ERROR
            Swal.fire({
                icon: 'error',
                title: 'Ha habido un error',
                text: 'Hubo un error, intentalo de nuevo'
            })
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
});

//SI EL PRODUCTO SE GUARDA EN LA BASE DE DATOS
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto,
});

//SI HUBO UN ERROR
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})

//FUNCION QUE DESCARGA LOS PRODUCTOS DE LA BASE DE DATOS
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch(descargarProductos());
        try {
            const respuesta = await clienteAxios.get('/productos');
            dispatch(descargaProductosExitosa(respuesta.data));
        } catch (error) {
            console.log(error)
            dispatch(descargaProductosError());
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true,
});

const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
});

//SELECCIONA Y ELIMINA EL PRODUCTO
export function borrarProductoAction(id) {
    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id));
        try {
            await clienteAxios.delete(`/productos/${id}`)
            dispatch(eliminarProductoExito())
            //SI SE ELIMINA SE MUESTRA LA ALERTA
            Swal.fire(
                '¡Eliminado!',
                'Tu producto se ha eliminado correctamente.',
                'success'
            )
        } catch (error) {
            console.log(error);
            dispatch(eliminarProductoError());
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})

//COLOCAR PRODUCTO EN EL FORMULARIO DE EDICION
export function obtenerProductoEditar(producto) {
    return (dispatch => {
        dispatch(obtenerProductoAction(producto))
    })
}

const obtenerProductoAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

//EDITA UN REGISTRO EN LA API Y STATE
export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch(editarProducto(producto));

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto);
            dispatch(editarProductoExito(producto));
        } catch (error) {
            console.log(error);
            dispatch(editarProductoError())
        }
    }
}

const editarProducto = producto => ({
    type: COMENZAR_EDICION_PRODUCTO,
})

const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})

const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})