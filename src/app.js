const express = require("express");
const cors = require("cors");
const config = require("./config/config");

// Importando rutas
const estudianteRoutes = require("./routes/estudiante.routes");
const cursoRoutes = require("./routes/curso.routes");
const inscripcionRoutes = require("./routes/inscripcion.routes");

// Middleware de errores
const { errorHandler, notFound } = require("./middlewares/error.handler");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Configuraciones
app.set('port', config.app.port);

// Rutas API
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/cursos', cursoRoutes);
app.use('/api/inscripcion', inscripcionRoutes);

// Ruta base
app.get('/', (req, res) => {
    res.json({
        message: 'API de Gestión de Cursos',
        endpoints: {
            estudiantes: '/api/estudiantes',
            cursos: '/api/cursos',
            inscripciones: '/api/inscripcion'
        }
    });
});

// Middleware para error 404
app.use(notFound);

// Middleware para manejo de errores
app.use(errorHandler);

module.exports = app;