create table game (
	id_juego serial primary key,
	title varchar(100),
	developer varchar(300),
	release_year int,
	gamemode varchar(100),
	gender varchar(300),
	perspective varchar(300),
	img varchar(255),
	frachise varchar(100),
);