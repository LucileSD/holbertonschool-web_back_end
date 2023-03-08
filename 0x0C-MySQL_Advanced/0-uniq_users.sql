-- create a table users
-- with id, email and name
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
	id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(255) NOT NULL,
	name VARCHAR(255),
	UNIQUE (email)
);
