DROP TABLE IF EXISTS accounts CASCADE;
create table accounts (
	id SERIAL PRIMARY KEY NOT NULL,
	organization_id INTEGER REFERENCES organization(id) ON DELETE CASCADE,
	username VARCHAR(255) NOT NULL,
	category VARCHAR(255) NOT NULL,
	url VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	created_at DATE
);
