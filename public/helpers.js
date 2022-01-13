const { Pool } = require('pg');
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

const isAuthenticated = function (userId) {

  if (userId) {
    const query = `
    SELECT id
    FROM users
    WHERE id = ${userId}
    `;

    return pool.query(query)
      .then(res => {

        if (res.rows.length === 0) {
          return false;
        } else {
          return res.rows[0].id;
        }
      });
  }

  return Promise.resolve(false);
};

const getPasswordsbyUsers = function (userId) {

  if (userId) {
    const query = `
    SELECT  accounts.id, accounts. organization_id, category, password, url, organization.name, organization_users.user_id 
    FROM accounts
    JOIN organization ON organization.id = accounts.organization_id
    JOIN organization_users ON organization.id = organization_users. organization_id
    WHERE  organization_users.user_id = ${userId};`
  return pool.query(query)
      .then(res => {
        return res.rows;
      })
  }

  return Promise.resolve(false);
};

// helper function to delete password from the database when passed the button id. The button id should match the password primary key.
const deletePasswordFromDb = function (buttonId) {
  const query = `
    DELETE FROM accounts
    WHERE accounts.id = ${buttonId}
  ;
  `
  return pool.query(query);

}

const getEditedPassword = function (buttonId) {
  const query =  `
    SELECT password
    FROM accounts
    WHERE id = ${buttonId}
    ;
  `
  return pool.query(query);
}

// helper function to get organizations for a user to populate the org dropdown box when they make a password
const getUserOrganizations = function (userId) {
  const query = `
  SELECT DISTINCT organization.name AS name
  FROM organization
  JOIN  organization_users ON organization.id = organization_users. organization_id
  WHERE user_id = ${userId};`
  return pool.query(query)
    .then(res => {
      return res.rows;
    });
};

//will be used to enter a new login/password to the database
const newPasswordToDatabase = function (orgId, category, url, password, username, created_at) {
  console.log(orgId, category, url, password, username, created_at);
  // pool.query(`SELECT id FROM organization WHERE organization.name = '${orgName}';`)
  const query =`
  INSERT INTO accounts (organization_id, category, url, password, username, created_at)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *`;
  return pool.query(query, [orgId, category, url, password, username, created_at])
  .then(res => {
    return res.rows;
    
  });
};

const getOrgIdFromName = function (name) {
  const query = `
  SELECT id
  FROM organization
  WHERE organization.name = '${name}';
  `
  return pool.query(query)
    .then(res => {
      console.log('RESULT OF ORG ID FROM NAME: ', res.rows[0])
      return res.rows[0].id;
    });

  };
    module.exports = {
      isAuthenticated,
      getPasswordsbyUsers,
      getUserOrganizations,
      deletePasswordFromDb,
      getEditedPassword,
      newPasswordToDatabase,
      getOrgIdFromName
    };
