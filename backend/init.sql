-- Contenido de tablas.sql
--Tabla de desarrolladores
CREATE TABLE IF NOT EXISTS developers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(300) NOT NULL,
    foundation_year INT NOT NULL,
    game_count INT NOT NULL,
    origin_country VARCHAR(50) NOT NULL,
    entity_type VARCHAR(50) NOT NULL
);

--Tabla de Franquicias
CREATE TABLE IF NOT EXISTS franchises (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100)
);

--Tabla de Sagas
CREATE TABLE IF NOT EXISTS sagas (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    id_franchise INT REFERENCES franchises(id) ON DELETE CASCADE
);

-- Tabla de juegos
CREATE TABLE IF NOT EXISTS games (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    release_year INT NOT NULL,
    gamemode VARCHAR(300) NOT NULL,
    genre VARCHAR(300) NOT NULL,
    perspective VARCHAR(300) NOT NULL,
    image VARCHAR(255) NOT NULL,
    id_franchise INT REFERENCES franchises(id) ON DELETE CASCADE,
    id_saga INT REFERENCES sagas(id) ON DELETE CASCADE,
    id_developer INT REFERENCES developers(id) ON DELETE CASCADE
);

-- Tabla de personajes
CREATE TABLE IF NOT EXISTS characters (
    id SERIAL PRIMARY KEY,
    character_name VARCHAR(100) NOT NULL,
    image VARCHAR(255) NOT NULL,
    gender VARCHAR(50) NOT NULL,
    species VARCHAR(50) NOT NULL,
    description VARCHAR(500) NOT NULL,
    main_skill VARCHAR(100) NOT NULL
);

-- Tabla de Relacion de Juegos con Personajes
CREATE TABLE IF NOT EXISTS game_characters(
    id SERIAL PRIMARY KEY,
    id_game INT NOT NULL REFERENCES games(id) ON DELETE CASCADE,
    id_character INT NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
    UNIQUE(id_game, id_character)
);

-- Contenido de funciones.sql
CREATE OR REPLACE FUNCTION delete_orphan_characters_after_game_delete() RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM characters
    WHERE id IN (
        SELECT c.id
        FROM characters c
        LEFT JOIN game_characters gc ON gc.id_character = c.id
        WHERE gc.id IS NULL
    );
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_delete_orphan_characters_after_game_delete
AFTER DELETE ON games
FOR EACH ROW
EXECUTE FUNCTION delete_orphan_characters_after_game_delete();