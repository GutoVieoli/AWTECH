CREATE DATABASE IF NOT EXISTS biblioteca  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

use biblioteca;

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) NOT NULL PRIMARY KEY,
    email VARCHAR(64) NOT NULL UNIQUE,
    cargo varchar(64) NOT NULL,
    senha VARCHAR(126) NOT NULL,
    salt VARCHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS books (
    id VARCHAR(64) NOT NULL PRIMARY KEY,
    nome VARCHAR(64) NOT NULL,
    autor VARCHAR(64) NOT NULL,
    editora VARCHAR(64) NOT NULL,
    ano INTEGER NOT NULL 
);

INSERT INTO users (id, email, cargo, senha, salt)
VALUES (
    'f33ced3a-8373-41a9-9c06-afaecda9aa72', 
    'adm@awtech.com',   
    'administrador',  
    '$2b$10$IoZ6/GEDw1w16wzG1KIfd.66cQ3lrdGGBZKsYI2W39p0nPnZEju2y', 
    '$2b$10$IoZ6/GEDw1w16wzG1KIfd.'    
);

INSERT INTO users (id, email, cargo, senha, salt)
VALUES (
    '99954869-cee8-42cd-a1ca-5c6d1553836e', 
    'rafael@awtech.com',   
    'visualizador',  
    '$2b$10$RhN5a/YOcbuNe6UpRhlFTeHx8KgC44vCTwbmicBf5URrTzJqbqgbS', 
    '$2b$10$RhN5a/YOcbuNe6UpRhlFTe'    
);

INSERT INTO books (id, nome, autor, editora, ano)
VALUES (
    'e988e28e-49a5-44c9-ba97-00758744524e', 
    'O PEQUENO PRINCIPE', 
    'ANTOINE', 
    'FARD EDITORIAL', 
    '1943'
);

INSERT INTO books (id, nome, autor, editora, ano)
VALUES (
    '080d8bb5-8ff1-404c-8f3e-d2d570b22ff6', 
    'LARANJA MECANICA', 
    'BURGESS', 
    'ALEPH', 
    '2005'
)


