import { useState, useEffect } from 'react';

const initialState = {
    nombre: '',
    categoria: '',
    marca: '',
    precio: '',
    cantidad: '',
    formaDePago: 'Efectivo', // Valor por defecto
    tipoTarjeta: '',
    cuotas: ''
};

function VentaForm({ onSave, ventaAEditar, onCancel }) {
    const [venta, setVenta] = useState(initialState);

    useEffect(() => {
        if (ventaAEditar) {
            setVenta({ ...initialState, ...ventaAEditar });
        } else {
            setVenta(initialState);
        }
    }, [ventaAEditar]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedVenta = { ...venta, [name]: value };

        if (name === 'formaDePago' && value !== 'Tarjeta') {
            updatedVenta.tipoTarjeta = '';
            updatedVenta.cuotas = '';
        }
        if (name === 'tipoTarjeta' && value !== 'Crédito') {
            updatedVenta.cuotas = '';
        }

        setVenta(updatedVenta);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(venta);
    };

    return (
        <div className="card mb-4">
            <div className="card-header">
                {ventaAEditar ? 'Editar Venta' : 'Agregar Nueva Venta'}
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nombre del Artículo</label>
                        <input type="text" name="nombre" value={venta.nombre} onChange={handleChange} className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Categoría</label>
                        <input type="text" name="categoria" value={venta.categoria} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Marca</label>
                        <input type="text" name="marca" value={venta.marca} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Precio (unidad)</label>
                            <input type="number" step="0.01" name="precio" value={venta.precio} onChange={handleChange} className="form-control" required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Cantidad Vendida</label>
                            <input type="number" name="cantidad" value={venta.cantidad} onChange={handleChange} className="form-control" required />
                        </div>
                    </div>

                    <hr />
                    <h5>Detalles de Pago</h5>

                    <div className="mb-3">
                        <label className="form-label">Forma de Pago</label>
                        <select name="formaDePago" value={venta.formaDePago} onChange={handleChange} className="form-select">
                            <option value="Efectivo">Efectivo</option>
                            <option value="Tarjeta">Tarjeta</option>
                            <option value="Transferencia">Transferencia</option>
                        </select>
                    </div>

                    {venta.formaDePago === 'Tarjeta' && (
                        <>
                            <div className="mb-3">
                                <label className="form-label">Tipo de Tarjeta</label>
                                <select name="tipoTarjeta" value={venta.tipoTarjeta} onChange={handleChange} className="form-select" required>
                                    <option value="">Seleccione...</option>
                                    <option value="Débito">Débito</option>
                                    <option value="Crédito">Crédito</option>
                                </select>
                            </div>

                            {venta.tipoTarjeta === 'Crédito' && (
                                <div className="mb-3">
                                    <label className="form-label">Cuotas</label>
                                    <input type="number" name="cuotas" value={venta.cuotas} onChange={handleChange} className="form-control" placeholder="Ej: 3" required />
                                </div>
                            )}
                        </>
                    )}

                    <button type="submit" className="btn btn-primary w-100 mt-3">
                        {ventaAEditar ? 'Actualizar Venta' : 'Registrar Venta'}
                    </button>
                    {ventaAEditar && (
                        <button type="button" className="btn btn-secondary w-100 mt-2" onClick={onCancel}>
                            Cancelar Edición
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}

export default VentaForm;