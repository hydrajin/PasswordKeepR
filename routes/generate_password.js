 // Routes to the "Generate Password" page
 router.get("/new/:organization_id", (req, res) => { // for distinct organization
  const organizationId = req.params.organization_id;
  db.query(`SELECT * FROM accounts WHERE organization_id = $1;`,[organizationId])
    .then(data => {
      const templateVars = { accounts: data.rows, password: null, organizationId };
      res.render("generatePassword", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


router.post("/generate/:organization_id", (req, res) => { // for distinct organization
  const organizationId = req.params.organization_id;
  const username = req.body.username;
  const url = req.body.url;
  const category = req.body.category;
  db.query(`SELECT * FROM accounts WHERE organization_id = $1;`,[organizationId])
    .then(data => {
      const password = generatePassword();
      const templateVars = { accounts: data.rows, password, organizationId, username, url, category };
      res.render("createAccount", templateVars);
      console.log(templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});