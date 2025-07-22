--Tabla de desarrolladores
CREATE TABLE developers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(300) NOT NULL,
    foundation_year INT NOT NULL,
    game_count INT NOT NULL,
    origin_country VARCHAR(50) NOT NULL,
    entity_type VARCHAR(50) NOT NULL
);

--Tabla de Franquicias
CREATE TABLE franchises (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100)
);

--Tabla de Sagas
CREATE TABLE sagas (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    id_franchise INT REFERENCES franchises(id) ON DELETE CASCADE
);

-- Tabla de juegos
CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    release_year INT NOT NULL,
    gamemode VARCHAR(100) NOT NULL,
    genre VARCHAR(300) NOT NULL,
    perspective VARCHAR(300) NOT NULL,
    image VARCHAR(255) NOT NULL,
    id_franchise INT REFERENCES franchises(id) ON DELETE CASCADE,
    id_saga INT REFERENCES sagas(id) ON DELETE CASCADE,
    id_developer INT REFERENCES developers(id) ON DELETE CASCADE
);

-- Tabla de personajes
CREATE TABLE characters (
    id SERIAL PRIMARY KEY,
    character_name VARCHAR(100) NOT NULL,
    image VARCHAR(255) NOT NULL,
    gender VARCHAR(50) NOT NULL,
    species VARCHAR(50) NOT NULL,
    description VARCHAR(500) NOT NULL,
    main_skill VARCHAR(100) NOT NULL
);

-- Tabla de Relacion de Juegos con Personajes
CREATE TABLE game_characters(
    id SERIAL PRIMARY KEY,
    id_game INT NOT NULL REFERENCES games(id) ON DELETE CASCADE,
    id_character INT NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
    UNIQUE(id_game, id_character)
);
