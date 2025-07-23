const { Client } = require('pg');

const dbClient = new Client({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'playle',
});

// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//                POST (CREATE)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
async function createSaga(
    new_saga_info
) {
    const result = await dbClient.query(
        'INSERT INTO sagas(title,id_franchise) VALUES ($1,$2) RETURNING *',
        [new_saga_info.title, new_saga_info.id_franchise])
    if (result.rowCount === 0) {
        return undefined
    }
    return result.rows[0]
};

// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//                 GET (READ)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
async function getAllSagas() {
    const result = await dbClient.query(
        'SELECT sagas.id as saga_id, sagas.title as title, sagas.id_franchise as id_franchise'
        + ' ' +
        'FROM sagas'
    );

    const sagas = {};

    result.rows.forEach(row => {
        if (!sagas[row.saga_id]) {
            sagas[row.saga_id] = {
                title: row.title,
                id_franchise: row.id_franchise
            }
        }
    });
    return sagas;
};
async function getOneSaga(id) {
    const result = await dbClient.query(
        'SELECT sagas.id as saga_id, sagas.title as title, sagas.id_franchise as id_franchise'
        + ' ' +
        'FROM sagas WHERE sagas.id = $1', [id]
    );

    const sagas = {};

    result.rows.forEach(row => {
        if (!sagas[row.saga_id]) {
            sagas[row.saga_id] = {
                title: row.title,
                id_franchise: row.id_franchise
            }
        }
    });
    return sagas;
};
async function getAllSagasByFranchise(id) {
    const result = await dbClient.query(
        'SELECT sagas.id as saga_id, sagas.title as title, sagas.id_franchise as id_franchise'
        + ' ' +
        'FROM sagas WHERE sagas.id_franchise = $1', [id]
    );

    const sagas = {};

    result.rows.forEach(row => {
        if (!sagas[row.saga_id]) {
            sagas[row.saga_id] = {
                title: row.title,
                id_franchise: row.id_franchise
            }
        }
    });
    return sagas;
};

// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//                PUT (UPDATE)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
async function updateSaga(
    id,
    updated_saga_info
) {
    const result = await dbClient.query(
        'UPDATE sagas'
        + ' ' +
        'SET title = $1, id_franchise = $2'
        + ' ' +
        'WHERE id = $3 RETURNING *',
        [updated_saga_info.title, updated_saga_info.id_franchise , id]
    );
    return result.rows[0];
};

// ╔═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╗
//               DELETE (DELETE)
// ╚═══━━━━━━━━━━━━─── • ───━━━━━━━━━━━━═══╝
async function deleteSaga(id) {
    const result = await dbClient.query(
        'DELETE FROM sagas WHERE id = $1', [id]
    )
    if (result.rows.rowCount === 0) {
        return undefined
    }
    return id
};

module.exports = {
    getAllSagas,
    getAllSagasByFranchise,
    getOneSaga,
    createSaga,
    deleteSaga,
    updateSaga
};