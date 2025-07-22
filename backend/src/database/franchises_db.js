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
        if (!franchises[row.franchise_id]) {
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
        if (!franchises[row.franchise_id]) {
            franchises[row.franchise_id] = {
                title: row.title,
            }
        }
    });
    return franchises;
};

// Extras
async function getAllFranchisesWithSagas() {
    const result = await dbClient.query(
        'SELECT franchises.id as franchise_id, franchises.title as franchise_title, sagas.id as saga_id, sagas.title as saga_title, sagas.id_franchise as saga_id_franchise'
        + ' ' +
        'FROM franchises RIGHT JOIN sagas ON franchises.id = sagas.id_franchise'
    );
    
    const franchisesWithSagas = {};

    result.rows.forEach(row => {
        
        if (!franchisesWithSagas[row.franchise_id]) {
            franchisesWithSagas[row.franchise_id] = {
                franchise_title: row.franchise_title,
                sagas: []
            }
        }
        let saga = {id: row.saga_id, title: row.saga_title};
        
        franchisesWithSagas[row.franchise_id].sagas.push(saga);
    });
    return franchisesWithSagas;
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
    getAllFranchisesWithSagas,
    getOneFranchise,
    createFranchise,
    deleteFranchise,
    updateFranchise
};