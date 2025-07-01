const {Pool} = require('pg');

const dbClient = new Pool ({
    user: 'postgres',
    port: 5432,
    host: 'localhost',
    database: 'playle',
    password: 'postgres'
});

function getAllGames() {
    const result = dbClient.query('SELECT * FROM games');
    return result.rows;
};

module.exports = {
    getAllGames
};