DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name TEXT NOT NULL,
    password TEXT NOT NULL
);

DROP TABLE IF EXISTS leaderboard;

CREATE TABLE leaderboard
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name TEXT NOT NULL,
    score INTEGER
);

SELECT *
FROM leaderboard;
