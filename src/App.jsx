import { useState, useEffect } from 'react';
import axios from 'axios';
import VentaForm from './components/VentaForm';
import VentaList from './components/VentaList';
import logo from './assets/logo.png';
import mascota from './assets/mascota.png';

// La URL de tu API en el backend
const API_URL = '/api/ventas';

function App() {
  const [ventas, setVentas] = useState([]);
  const [ventaAEditar, setVentaAEditar] = useState(null);

  useEffect(() => {
    fetchVentas();
  }, []);

  const fetchVentas = async () => {
    try {
      const response = await axios.get(API_URL);
      setVentas(response.data);
    } catch (error) {
      console.error("Error al cargar las ventas:", error);
    }
  };

  const handleSaveVenta = async (ventaData) => {
    try {
      // --- PASO CLAVE: Convertir los strings del formulario a números ---
      const dataToSend = {
        ...ventaData,
        precio: parseFloat(ventaData.precio) || 0,     // Convierte a número con decimales
        cantidad: parseInt(ventaData.cantidad, 10) || 0, // Convierte a número entero
        // Si hay cuotas, también las convertimos
        cuotas: ventaData.cuotas ? parseInt(ventaData.cuotas, 10) : null
      };

      // Ahora usamos 'dataToSend' (con los números corregidos) para la petición
      if (dataToSend.id) {
        // Actualizar una venta existente
        await axios.put(`${API_URL}/${dataToSend.id}`, dataToSend);
      } else {
        // Crear una nueva venta
        await axios.post(API_URL, dataToSend);
      }

      fetchVentas(); // Recargar la lista de ventas para mostrar los cambios
      setVentaAEditar(null); // Limpiar el formulario y salir del modo edición
    } catch (error) {
      console.error("Error al guardar la venta:", error);
    }
  };

  const handleEdit = (venta) => {
    setVentaAEditar(venta);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta venta?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchVentas();
      } catch (error) {
        console.error("Error al eliminar la venta:", error);
      }
    }
  };

  const handleCancelEdit = () => {
    setVentaAEditar(null);
  };

  return (
    <div className="container mt-4">
      <header className="d-flex justify-content-between align-items-center mb-4 no-print">
        <img src={mascota} alt="Mascota" style={{ height: '80px' }} />

        <div className="text-center flex-grow-1">
          <img src={logo} alt="Logo El Atelier de los Útiles" style={{ height: '60px', marginBottom: '10px' }} />
          <h3>Registro de Ventas</h3>
        </div>

        <button className="btn btn-info" onClick={() => window.print()}>
          Imprimir Reporte
        </button>
      </header>

      <main>
        <div className="no-print">
          <VentaForm
            onSave={handleSaveVenta}
            ventaAEditar={ventaAEditar}
            onCancel={handleCancelEdit}
          />
        </div>

        <VentaList
          ventas={ventas}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}

export default App;