const { Pool } = require('pg');

const dbClient = new Pool({
  host: process.env.DB_HOST || 'postgres',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'playle',
});

// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//                POST (CREATE)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
async function createDeveloper(
    new_developer_info
) {
    const result = await dbClient.query(
        'INSERT INTO developers(name, foundation_year, game_count, origin_country, entity_type) VALUES ($1,$2,$3,$4,$5) RETURNING *',
        [new_developer_info.name, new_developer_info.foundation_year, new_developer_info.game_count, new_developer_info.origin_country, new_developer_info.entity_type])
    if (result.rowCount === 0) {
        return undefined
    }
    return result.rows[0]
};

// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//                 GET (READ)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
async function getAllDevelopers() {
    const result = await dbClient.query(
        'SELECT developers.id as developer_id, developers.name as devs_name, developers.foundation_year as foundation_year,'
        + ' ' +
        'developers.game_count as game_count, developers.origin_country as country, developers.entity_type as entity_type'
        + ' ' +
        'FROM developers'
    );

    const developers = {};

    result.rows.forEach(row => {
        if (!developers[row.developer_id]) {
            developers[row.developer_id] = {
                name: row.devs_name,
                foundation_year: row.foundation_year,
                game_count: row.game_count,
                country: row.country,
                entity_type: row.entity_type
            }
        }
    });
    return developers;
};
async function getOneDeveloper(id) {
    const result = await dbClient.query(
        'SELECT developers.id as developer_id, developers.name as devs_name, developers.foundation_year as foundation_year,'
        + ' ' +
        'developers.game_count as game_count, developers.origin_country as country, developers.entity_type as entity_type'
        + ' ' +
        'FROM developers WHERE developers.id = $1', [id]
    );

    const developers = {};

    result.rows.forEach(row => {
        if (!developers[row.developer_id]) {
            developers[row.developer_id] = {
                name: row.devs_name,
                foundation_year: row.foundation_year,
                game_count: row.game_count,
                country: row.country,
                entity_type: row.entity_type
            }
        }
    });
    return developers;
};

// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//                PUT (UPDATE)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
async function updateDeveloper(
    id,
    updated_developer_info
) {
    const result = await dbClient.query(
        'UPDATE developers'
        + ' ' +
        'SET name = $1,foundation_year = $2, game_count = $3, origin_country = $4, entity_type = $5'
        + ' ' +
        'WHERE id = $6 RETURNING *',
        [updated_developer_info.name, updated_developer_info.foundation_year, updated_developer_info.game_count, updated_developer_info.origin_country, updated_developer_info.entity_type, id]
    );
    return result.rows[0];
};

// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//               DELETE (DELETE)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
async function deleteDeveloper(id) {
    const result = await dbClient.query(
        'DELETE FROM developers WHERE id = $1 RETURNING id', [id]
    );
    return result.rows[0]?.id; // Devuelve el ID eliminado o undefined
}


module.exports = {
    getAllDevelopers,
    getOneDeveloper,
    createDeveloper,
    deleteDeveloper,
    updateDeveloper
};