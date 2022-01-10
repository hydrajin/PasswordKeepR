/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // Routes to the "Main" page
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM accounts;`)
      .then(data => {
        console.log(data.rows);
        const templateVars = {accounts:data.rows};
        res.render("index",templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  // Routes to the "Generate Password" page
  router.get("/new", (req, res) => {
    db.query(`SELECT * FROM accounts;`)
      .then(data => {
        console.log(data.rows);
        // const templateVars = {accounts:data.rows};
        res.render("generatePassword");
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  // Shows the .JSON of the accounts db files
  router.get("/accounts", (req, res) => { // /api/users/accounts
    db.query(`SELECT * FROM accounts;`)
      .then(data => {
        const accounts = data.rows;
        res.json({ accounts });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  // shows the .JSON of the users db files
  router.get("/users", (req, res) => { // /api/users/accounts
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
