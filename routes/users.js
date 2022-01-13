/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => { // means /users
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


  router.get("/accounts", (req, res) => { // /users/accounts
    const userId = req.cookies["user_id"];
    if (!userId) {
      return res.redirect("/"); // homepage
    }

    let organizationId = req.cookies["organizationId"];
    console.log("+++++++++++", organizationId);
    // organizationId = parseInt(organizationId);
    db.query(`SELECT * FROM organization WHERE id = $1`, [organizationId])
      .then(result => {
        const organization = result.rows[0];

        db.query(`SELECT * FROM accounts WHERE organization_id = $1;`, [organizationId])
          .then(data => {
            const accounts = data.rows;
            const templateVars = { accounts, userId, organizationId, organization };
            res.render("accounts", templateVars);
          })
          .catch(err => {
            console.log("===============", err.message);
            res
              .status(500)
              .json({ error: err.message });
          });
      });
  });


  // show edit route
  router.get("/", (req, res) => { // means /users
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

  router.post("/accounts/:password/delete", (req, res) => {
    const userId = req.cookies["user_id"];
    if (!userId) {
      return res.redirect("/"); // homepage
    }
    let passwordId = req.params.accounts.password;
    console.log(passwordId);
    db.query("DELETE FROM accounts WHERE id = $1",[passwordId])
      .then(data => {
        console.log("delete password", passwordId);
        res.redirect("/");
      })
      .catch(err => {
        console.log("----------", err.message);
        res
          .status(500)
          .json({ error: "Unable to Delete"});
      });
  });

  router.post("/accounts/passwords/:id/edit", (req, res) => {
    let passwordId = req.params.id;
    db.query(" UPDATE accounts SET password = $1 WHERE id = $2",[req.body.password, passwordId])
      .then(data => {
        console.log("delete password", passwordId);
        res.redirect("/");

      })
      .catch(err => {
        console.log("----------", err.message);
        res
          .status(500)
          .json({ error: "Unable to Delete"});
      });
  });





  return router;
};
