const errorHandler = (err, req, res, next) => {
    console.error(err);
    
    // Errores de validación de Sequelize
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
        const errors = err.errors.map(e => e.message);
        return res.status(400).json({
            error: true,
            status: 400,
            message: errors
        });
    }
    
    // Errores generales
    const message = err.message || 'Error interno del servidor';
    const status = err.statusCode || 500;
    
    res.status(status).json({
        error: true,
        status: status,
        message: message
    });
};

const notFound = (req, res, next) => {
    res.status(404).json({
        error: true,
        status: 404,
        message: 'Endpoint no encontrado'
    });
};

module.exports = {
    errorHandler,
    notFound
};