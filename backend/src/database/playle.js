const {Pool} = require('pg');

const dbClient = new Pool ({
    user: 'postgres',
    port: 5432,
    host: 'localhost',
    database: 'playle',
    password: 'postgres'
});

async function getAllGames() {
    const result = await dbClient.query('SELECT * FROM games');
    return result.rows;
};

module.exports = {
    getAllGames
};