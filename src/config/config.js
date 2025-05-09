require('dotenv').config();

module.exports = 
{
    app: 
    {
        port: process.env.PORT || 3000
    },
    mysql: 
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'parcial2',
    }
};