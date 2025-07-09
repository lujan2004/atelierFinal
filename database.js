const { Sequelize, DataTypes } = require('sequelize');

// ¡VOLVEMOS A CONECTAR LA DB AQUÍ!
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './libreria.sqlite' // Usamos la ruta relativa de nuevo
});

const Venta = sequelize.define('Venta', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    categoria: { type: DataTypes.STRING },
    marca: { type: DataTypes.STRING },
    precio: { type: DataTypes.FLOAT, allowNull: false },
    cantidad: { type: DataTypes.INTEGER, allowNull: false },
    fechaVenta: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
    formaDePago: { type: DataTypes.STRING },
    tipoTarjeta: { type: DataTypes.STRING, allowNull: true },
    cuotas: { type: DataTypes.INTEGER, allowNull: true }
}, {
    timestamps: false
});

// Exportamos ambos
module.exports = { sequelize, Venta };