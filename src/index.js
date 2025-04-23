const app = require("./app");
const sequelize = require("./db/db");

// Importa modelos para asegurar que se definan las relaciones
require("./models");

// Sincroniza los modelos con la base de datos (crea tablas si no existen)
async function syncDB() {
    try {
        await sequelize.sync({ force: false });
        console.log("Base de datos sincronizada correctamente");
    } catch (error) {
        console.error("Error al sincronizar la base de datos:", error);
    }
}

// Inicia el servidor
async function startServer() {
    await syncDB();
    
    app.listen(app.get('port'), () => {
        console.log(`Servidor corriendo en http://localhost:${app.get('port')}`);
    });
}

startServer();