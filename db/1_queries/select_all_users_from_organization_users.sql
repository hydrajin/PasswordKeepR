SELECT *, organization_users.user_id AS userID
FROM users
JOIN organization_users ON users.id = user_id;

--  id |        email        |   password   | id | organization_id | user_id | created_at | userid
-- ----+---------------------+--------------+----+-----------------+---------+------------+--------
--   1 | cstuer0@gmail.com   | GFPdkiT6gcCv |  1 |               1 |       1 | 2021-12-06 |      1
--   2 | bhuebner1@yahoo.co  | cfJM4NPpfU   |  2 |               2 |       2 | 2021-07-12 |      2
--   2 | bhuebner1@yahoo.co  | cfJM4NPpfU   |  3 |               3 |       2 | 2021-11-04 |      2
--   1 | cstuer0@gmail.com   | GFPdkiT6gcCv |  4 |               4 |       1 | 2021-09-10 |      1
--   3 | awombwell2@mail.com | fYXud3       |  5 |               5 |       3 | 2021-12-21 |      3



-- SELECT * users
-- FROM users

-- organization_users.user_id AS userID
-- FROM users
-- JOIN organization_users ON users.id = user_id;
