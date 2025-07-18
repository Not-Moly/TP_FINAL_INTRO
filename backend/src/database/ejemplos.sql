-- Desarrolladores
INSERT INTO developers (name, foundation_year, game_count, origin_country, entity_type) VALUES
('Naughty Dog', 1984, 12, 'Estados Unidos', 'Estudio'),
('FromSoftware', 1986, 15, 'Japón', 'Compañía'),
('CD Projekt Red', 2002, 8, 'Polonia', 'Estudio'),
('Rockstar Games', 1998, 20, 'Estados Unidos', 'Compañía'),
('Santa Monica Studio', 2001, 10, 'Estados Unidos', 'Estudio');

-- Franquicias
INSERT INTO franchises (title) VALUES
('Uncharted'),
('Dark Souls'),
('The Witcher'),
('Grand Theft Auto'),
('God of War');

-- Sagas
INSERT INTO sagas (title, id_franchise) VALUES
('Trilogía Uncharted', 1),
('Trilogía Dark Souls', 2),
('Saga The Witcher', 3),
('Universo 3D de GTA', 4),
('Saga Nórdica de God of War', 5);

-- Juegos 
INSERT INTO games (title, release_year, gamemode, genre, perspective, image, id_saga, id_franchise, id_developer) VALUES
('Uncharted: El Tesoro de Drake', 2007, 'Un jugador', 'Acción-aventura', 'Tercera persona', 'uncharted1.jpg', 1, 1, 1),
('Uncharted 2: El Reino de los Ladrones', 2009, 'Multijugador, Un jugador', 'Acción-aventura', 'Tercera persona', 'uncharted2.jpg', 1, 1, 1),
('Dark Souls', 2011, 'Un jugador', 'Acción, Aventura, RPG', 'Tercera persona', 'darksouls1.jpg', 2, 2, 2),
('Dark Souls III', 2016, 'Multijugador, Un jugador', 'Acción, Aventura, RPG', 'Tercera persona', 'darksouls3.jpg', 2, 2, 2),
('The Witcher 3: Wild Hunt', 2015, 'Un jugador', 'Acción, Aventura, RPG', 'Tercera persona', 'witcher3.jpg', 3, 3, 3),
('Grand Theft Auto V', 2013, 'Multijugador, Pantalla dividida, Un jugador', 'Acción-aventura', 'Tercera persona', 'gtav.jpg', 4, 4, 4),
('God of War (2018)', 2018, 'Un jugador', 'Acción-aventura', 'Tercera persona', 'gow2018.jpg', 5, 5, 5),
('God of War: Ragnarok', 2022, 'Un jugador', 'Acción-aventura', 'Tercera persona', 'ragnarok.jpg', 5, 5, 5),
('The Witcher 2: Assassins of Kings', 2011, 'Un jugador', 'Acción, Aventura, RPG', 'Tercera persona', 'witcher2.jpg', 3, 3, 3),
('Grand Theft Auto: San Andreas', 2004, 'Multijugador, Un jugador', 'Acción-aventura', 'Tercera persona', 'gtasa.jpg', 4, 4, 4);

-- Personajes
INSERT INTO characters (character_name, image, gender, species, description, main_skill, id_game) VALUES
('Nathan Drake', 'nathan.jpg', 'Masculino', 'Humano', 'Cazador de tesoros y aventurero', 'Escalar y disparar', 1),
('Chloe Frazer', 'chloe.jpg', 'Femenino', 'Humano', 'Ladrona y exploradora experta', 'Sigilo y combate', 2),
('Artorias', 'artorias.jpg', 'Masculino', 'No-muerto', 'Caballero legendario del Abismo', 'Espada pesada', 3),
('Vigilante del Abismo', 'abyss.jpg', 'Desconocido', 'No-muerto', 'Líder de la Legión de Farron', 'Ataques rápidos con espada', 4),
('Geralt de Rivia', 'geralt.jpg', 'Masculino', 'Brujo', 'Cazador de monstruos mutado', 'Espadas y señales mágicas', 5),
('Ciri', 'ciri.jpg', 'Femenino', 'Humano', 'Sangre antigua entrenada como brujo', 'Teletransporte y espada', 5),
('Michael De Santa', 'michael.jpg', 'Masculino', 'Humano', 'Criminal retirado viviendo en lujo', 'Conducción y armas', 6),
('Kratos', 'kratos.jpg', 'Masculino', 'Dios', 'Dios de la guerra con ira infinita', 'Fuerza y combate', 7),
('Atreus', 'atreus.jpg', 'Masculino', 'Semidiós', 'Hijo de Kratos con poderes mágicos', 'Arquería y magia', 8),
('Carl "CJ" Johnson', 'cj.jpg', 'Masculino', 'Humano', 'Gánster que regresa a San Andreas', 'Conducción y disparos', 10);
