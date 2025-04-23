const { Sequelize } = require("sequelize");
const config = require("../config/config");

const sequelize = new Sequelize(
    config.mysql.database,
    config.mysql.user,
    config.mysql.password,
    {
        host: config.mysql.host,
        dialect: "mysql",
        port: config.mysql.port,
        logging: false // Puedes cambiar a true para ver las consultas SQL
    }
);

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("Conexión a la base de datos establecida correctamente");
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
    }
}

testConnection();

module.exports = sequelize;