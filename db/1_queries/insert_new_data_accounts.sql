INSERT INTO accounts (organization_id, username, category, url, password, created_at)
VALUES (1,'wethebest', 'misc', 'www.google.com', 'pass123', now());

/* HAD to insert 5 times ERROR:  duplicate key value violates unique constraint "accounts_pkey"
