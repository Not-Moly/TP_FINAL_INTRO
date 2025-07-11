INSERT INTO developers (name, foundation_year, game_count, origin_country, entity_type) VALUES
('Mojang Studios', 2009, 5, 'Sweden', 'Subsidiary'),
('Nintendo', 1889, 250, 'Japan', 'Public'),
('Rockstar Games', 1998, 30, 'USA', 'Private'),
('CD Projekt Red', 2002, 15, 'Poland', 'Public'),
('Valve Corporation', 1996, 20, 'USA', 'Private'),
('Santa Monica Studio', 1999, 10, 'USA', 'Subsidiary');

INSERT INTO games (title, release_year, gamemode, genre, perspective, image, franchise, id_developer) VALUES
('Minecraft', 2011, 'Single-player, Multiplayer', 'Sandbox, Survival', 'First-person / Third-person', 'minecraft.jpg', 'Minecraft', 1),
('The Legend of Zelda: Breath of the Wild', 2017, 'Single-player', 'Action-adventure', 'Third-person', 'zelda.jpg', 'The Legend of Zelda', 2),
('Grand Theft Auto V', 2013, 'Single-player, Multiplayer', 'Action-adventure', 'Third-person / First-person', 'gta5.jpg', 'Grand Theft Auto', 3),
('The Witcher 3: Wild Hunt', 2015, 'Single-player', 'RPG', 'Third-person', 'witcher3.jpg', 'The Witcher', 4),
('Half-Life 2', 2004, 'Single-player', 'First-person shooter', 'First-person', 'halflife2.jpg', 'Half-Life', 5),
('God of War', 2018, 'Single-player', 'Action-adventure', 'Third-person', 'gow.jpg', 'God of War', 6);

INSERT INTO characters (character_name, franchise, image, gender, species, description, main_skill, id_game) VALUES
('Steve', 'Minecraft', 'steve.jpg', 'Male', 'Human', 'The default Minecraft character', 'Building and mining', 1),
('Link', 'The Legend of Zelda', 'link.jpg', 'Male', 'Hylian', 'Courageous hero of Hyrule', 'Swordsmanship', 2),
('Trevor Philips', 'Grand Theft Auto', 'trevor.jpg', 'Male', 'Human', 'Unpredictable and violent criminal', 'Combat and chaos', 3),
('Geralt of Rivia', 'The Witcher', 'geralt.jpg', 'Male', 'Witcher', 'Monster hunter with superhuman abilities', 'Sword & Signs', 4),
('Gordon Freeman', 'Half-Life', 'gordon.jpg', 'Male', 'Human', 'Silent protagonist and physicist', 'Crowbar and science', 5),
('Kratos', 'God of War', 'kratos.jpg', 'Male', 'Demigod', 'Spartan warrior with tragic past', 'Godly strength', 6);

