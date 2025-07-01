--Tabla de desarrolladores
CREATE TABLE developers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(300) NOT NULL,
    foundation_year INT,
    game_count INT,
    origin_country VARCHAR(50),
    entity_type VARCHAR(50)
);

-- Tabla de juegos
CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    release_year INT,
    gamemode VARCHAR(100),
    genre VARCHAR(300),
    perspective VARCHAR(300),
    image VARCHAR(255),
    franchise VARCHAR(100),
    id_developer INT REFERENCES developers(id) ON DELETE SET NULL
);

-- Tabla de personajes
CREATE TABLE characters (
    id SERIAL PRIMARY KEY,
    char_name VARCHAR(100) NOT NULL,
    franchise VARCHAR(100),
    image VARCHAR(255),
    sex VARCHAR(50),
    species VARCHAR(50),
    description VARCHAR(500),
    main_skill VARCHAR(100),
    id_game INT REFERENCES games(id) ON DELETE SET NULL
);



