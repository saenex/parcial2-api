const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const Estudiante = require('./estudiante.model');
const Curso = require('./curso.model');

const Inscripcion = sequelize.define('Inscripcion', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  calificacion: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  fechaInscripcion: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  observaciones: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  modalidad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estudianteId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Estudiante,
      key: 'id',
    }
  },
  cursoId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Curso,
      key: 'id',
    }
  }
}, {
  timestamps: false,
  tableName: 'inscripciones'
});

// Relaciones
Estudiante.hasMany(Inscripcion, { foreignKey: 'estudianteId' });
Curso.hasMany(Inscripcion, { foreignKey: 'cursoId' });
Inscripcion.belongsTo(Estudiante, { foreignKey: 'estudianteId' });
Inscripcion.belongsTo(Curso, { foreignKey: 'cursoId' });

module.exports = Inscripcion;
