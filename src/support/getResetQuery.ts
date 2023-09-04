export function getResetQuery() {
    const resetQuery = `
DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS decks;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    userid SERIAL PRIMARY KEY,
    username CHARACTER VARYING(200)
);

CREATE TABLE decks (
    deckid SERIAL PRIMARY KEY,
    userid INT REFERENCES users(userid),
    name CHARACTER VARYING(200)

);

CREATE TABLE cards (
    cardid SERIAL PRIMARY KEY,
    front TEXT,
    back TEXT,
    deckid INT REFERENCES deck(deckid)
);

INSERT INTO users (username) VALUES
    ('Tom'),
    ('Henry'),
    ('Ana'),
    ('Beth'),
    ('Silviu'),
    ('Stephanie'),
    ('Laura');

INSERT INTO decks (userid, name) VALUES
    (1, 'Spanish'),
    (1, 'German'),
    (1, 'French'),
    (2, 'Spanish'),
    (2, 'German'),
    (2, 'French'),
    (3, 'Spanish'),
    (3, 'German'),
    (3, 'French'),
    (4, 'Spanish'),
    (4, 'German'),
    (4, 'French'),
    (5, 'Spanish'),
    (5, 'German'),
    (5, 'French'),
    (6, 'Spanish'),
    (6, 'German'),
    (6, 'French'),
    (7, 'Spanish'),
    (7, 'German'),
    (7, 'French');

INSERT INTO cards (deckid, front, back)
VALUES
    (1, 'Hola', 'Hello'),
    (1, 'Gato', 'Cat'),
    (1, 'Perro', 'Dog'),
    (1, 'Casa', 'House'),
    (1, 'Libro', 'Book'),
    (1, 'Playa', 'Beach'),
    (1, 'Agua', 'Water'),
    (1, 'Amigo', 'Friend'),
    (1, 'Comida', 'Food'),
    (1, 'Sol', 'Sun'),
    (1, 'Luna', 'Moon'),
    (1, 'Estrella', 'Star'),
    (1, 'Feliz', 'Happy'),
    (1, 'Triste', 'Sad'),
    (1, 'Rojo', 'Red'),
    (1, 'Verde', 'Green'),
    (1, 'Azul', 'Blue'),
    (1, 'Blanco', 'White'),
    (1, 'Negro', 'Black'),
    (1, 'Tiempo', 'Time');

INSERT INTO cards (deckid, front, back) VALUES
    (2, 'Hallo', 'Hello'),
    (2, 'Katze', 'Cat'),
    (2, 'Hund', 'Dog'),
    (2, 'Haus', 'House'),
    (2, 'Buch', 'Book'),
    (2, 'Strand', 'Beach'),
    (2, 'Wasser', 'Water'),
    (2, 'Freund', 'Friend'),
    (2, 'Essen', 'Food'),
    (2, 'Sonne', 'Sun'),
    (2, 'Mond', 'Moon'),
    (2, 'Stern', 'Star'),
    (2, 'Glücklich', 'Happy'),
    (2, 'Traurig', 'Sad'),
    (2, 'Rot', 'Red'),
    (2, 'Grün', 'Green'),
    (2, 'Blau', 'Blue'),
    (2, 'Weiß', 'White'),
    (2, 'Schwarz', 'Black'),
    (2, 'Zeit', 'Time');

INSERT INTO cards (deckid, front, back) VALUES
    (3, 'Bonjour', 'Hello'),
    (3, 'Chat', 'Cat'),
    (3, 'Chien', 'Dog'),
    (3, 'Maison', 'House'),
    (3, 'Livre', 'Book'),
    (3, 'Plage', 'Beach'),
    (3, 'Eau', 'Water'),
    (3, 'Ami', 'Friend'),
    (3, 'Nourriture', 'Food'),
    (3, 'Soleil', 'Sun'),
    (3, 'Lune', 'Moon'),
    (3, 'Étoile', 'Star'),
    (3, 'Heureux', 'Happy'),
    (3, 'Triste', 'Sad'),
    (3, 'Rouge', 'Red'),
    (3, 'Vert', 'Green'),
    (3, 'Bleu', 'Blue'),
    (3, 'Blanc', 'White'),
    (3, 'Noir', 'Black'),
    (3, 'Temps', 'Time');

`;

    return resetQuery;
}
