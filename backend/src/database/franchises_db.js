const { Pool } = require('pg');

const dbClient = new Pool({
    user: 'postgres',
    port: 5000,
    host: 'localhost',
    database: 'playle',
    password: 'postgres'
});

// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//                POST (CREATE)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
async function createFranchise(
    new_franchise_info
) {
    const result = await dbClient.query(
        'INSERT INTO franchises(title) VALUES ($1) RETURNING *',
        [new_franchise_info.title])
    if (result.rowCount === 0) {
        return undefined
    }
    return result.rows[0]
};

// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//                 GET (READ)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
async function getAllFranchises() {
    const result = await dbClient.query(
        'SELECT franchises.id as franchise_id, franchises.title as title'
        + ' ' +
        'FROM franchises'
    );

    const franchises = {};

    result.rows.forEach(row => {
        if ([!franchises[row.franchise_id]]) {
            franchises[row.franchise_id] = {
                title: row.title,
            }
        }
    });
    return franchises;
};
async function getOneFranchise(id) {
    const result = await dbClient.query(
        'SELECT franchises.id as franchise_id, franchises.title as title'
        + ' ' +
        'FROM franchises WHERE franchises.id = $1', [id]
    );

    const franchises = {};

    result.rows.forEach(row => {
        if ([!franchises[row.franchise_id]]) {
            franchises[row.franchise_id] = {
                title: row.title,
            }
        }
    });
    return franchises;
};


// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//                PUT (UPDATE)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
async function updateFranchise(
    id,
    updated_franchise_info
) {
    const result = await dbClient.query(
        'UPDATE franchises'
        + ' ' +
        'SET title = $1'
        + ' ' +
        'WHERE id = $2 RETURNING *',
        [updated_franchise_info.title, id]
    );
    return result.rows[0];
};

// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//               DELETE (DELETE)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
async function deleteFranchise(id) {
    const result = await dbClient.query(
        'DELETE FROM franchises WHERE id = $1', [id]
    )
    if (result.rows.rowCount === 0) {
        return undefined
    }
    return id
};

module.exports = {
    getAllFranchises,
    getOneFranchise,
    createFranchise,
    deleteFranchise,
    updateFranchise
};