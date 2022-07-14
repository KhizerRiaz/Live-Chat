const express = require("express");
const router = express.Router();
const client = require("./../connection.js");

const query = require("./../models/clients.js");

router.use(express.json());

// client.connect();

router.get("/", async (req, res) => {
  client.query(`SELECT * FROM postgres.clients`, (err, result) => {
    if (!err) {
      console.log(result.rows);
      res.send(result.rows);
      // res.send("ssasd")
    }
  });
  client.end;
});

router.post("/", async (req, res) => {
  client.query(query, (err, message) => {});

  client.query(
    `select clients.email from clients where email = '${req.body.email}'`,
    (err, result) => {
      if (!err) {
        if (!result.rows.length) {
          let insertQuery = `insert into clients (name , email, waiting)
                            values ('${req.body.name}' , '${req.body.email}', ${req.body.waiting})`;

          client.query(insertQuery, (err, message) => {
            if (!err) {
              res.send("ok");
            } else {
              console.log(err.message);
            }
          });
        } else {
          res.send("Email already exists");
        }
      } else {
        console.log(err.message);
      }
    }
  );
  client.end;
});

router.put("/:email", (req, res) => {
  let updateQuery = `update clients
                        set waiting = ${req.body.waiting}
                         where email = '${req.params.email}'`;

  client.query(updateQuery, (err, result) => {
    if (!err) {
      res.send("Update was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

router.get("/vacant", async (req, res) => {
  client.query(
    `SELECT vendors.name FROM vendors where vendors.availabler1 = 0 AND vendors.availabler2 = 0`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else {
        console.log(err.message);
      }
    }
  );
  client.end;
});

router.get("/notvacant", async (req, res) => {
  client.query(
    `SELECT vendors.name FROM vendors where vendors.availabler1 = 1 OR vendors.availabler2 = 1`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else {
        console.log(err.message);
      }
    }
  );
  client.end;
});

router.post("/checkroom", async (req, res) => {
  client.query(
    `SELECT vendors.availabler1 FROM vendors where room1 = ${req.body.room} `,
    (err, result) => {
      if (!err) {
        if (!result.rows.length) {
          client.query(
            `SELECT vendors.availabler2 FROM vendors where room2 = ${req.body.room} `,
            (err, result) => {
              if (!err) {
                res.send(result.rows);
              }
            }
          );
        } else {
          res.send(result.rows);
        }
      } else {
        console.log(err.message);
      }
    }
  );
  client.end;
});

module.exports = router;
