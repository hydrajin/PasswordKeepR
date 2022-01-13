DROP TABLE IF EXISTS organization_users;
CREATE TABLE organization_users (
	id SERIAL PRIMARY KEY NOT NULL,
	organization_id INTEGER REFERENCES organization(id) ON DELETE CASCADE,
	user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
	created_at DATE
);
