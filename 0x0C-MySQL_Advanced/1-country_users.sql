-- creates a table users
-- with id, email, name, country
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
	id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(255) NOT NULL,
	name VARCHAR(255),
	country ENUM('US', 'CO', 'TN') NOT NULL,
	UNIQUE (email)
);
