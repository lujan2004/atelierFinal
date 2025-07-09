import React from 'react';

function VentaList({ ventas }) {
    return (
        <div className="card mt-4">
            <div className="card-header">
                Historial de Ventas Recientes
            </div>
            <div className="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <table className="table table-sm table-striped">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Artículo</th>
                            <th>Cant.</th>
                            <th>Precio Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.map(venta => (
                            <tr key={venta.id}>
                                <td>{new Date(venta.fechaVenta).toLocaleString()}</td>
                                <td>{venta.Articulo ? venta.Articulo.nombre : 'N/A'}</td>
                                <td>{venta.cantidadVendida}</td>
                                <td>${(venta.cantidadVendida * venta.precioDeVenta).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {ventas.length === 0 && <p className="text-center">Aún no se han registrado ventas.</p>}
            </div>
        </div>
    );
}

export default VentaList;