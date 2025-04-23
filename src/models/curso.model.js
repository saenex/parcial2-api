const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const Curso = sequelize.define('Curso', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duracion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  modalidad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fechaInicio: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = Curso;
