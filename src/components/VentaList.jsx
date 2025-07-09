function VentaList({ ventas, onEdit, onDelete }) {
    return (
        <div className="card">
            <div className="card-header">
                Historial de Ventas
            </div>
            <div className="card-body">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Artículo</th>
                            <th>Categoría</th>
                            <th>Marca</th>
                            <th>Cant.</th>
                            <th>Precio Unit.</th>
                            <th>Total</th>
                            <th>Forma de Pago</th>
                            <th className="no-print">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.map((venta) => (
                            <tr key={venta.id}>
                                <td>{new Date(venta.fechaVenta).toLocaleString()}</td>
                                <td>{venta.nombre}</td>
                                <td>{venta.categoria}</td>
                                <td>{venta.marca}</td>
                                <td>{venta.cantidad}</td>
                                <td>${parseFloat(venta.precio).toFixed(2)}</td>

                                {/* --- LÍNEA CORREGIDA --- */}
                                <td>
                                    <strong>${(venta.cantidad * venta.precio).toFixed(2)}</strong>
                                </td>

                                <td>
                                    <strong>{venta.formaDePago}</strong>
                                    {venta.tipoTarjeta === 'Crédito' && ` (${venta.cuotas} cuotas)`}
                                    {venta.tipoTarjeta === 'Débito' && ` (Débito)`}
                                </td>
                                <td className="no-print">
                                    <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(venta)}>
                                        Editar
                                    </button>
                                    <button className="btn btn-sm btn-danger" onClick={() => onDelete(venta.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {ventas.length === 0 && <p className="text-center mt-3">No se han registrado ventas.</p>}
            </div>
        </div>
    );
}

export default VentaList;