const express = require("express");
const router = express.Router();
const client = require("./../connection.js");
const query = require("./../models/clients.js");
const query1 = require("./../models/vendors.js");

router.use(express.json());

router.post("/", async (req, res) => {
  client.query(query1, (err, result) => {});
  client.query(
    `select vendors.email from vendors where email = '${req.body.email}'`,
    (err, result) => {
      if (!err) {
        console.log(req.body.email);
        // console.log(result);
        if (result.rows.length) {
          client.query(
            `select vendors.room1 from vendors where room1 = '${req.body.room1}' OR room1 = '${req.body.room2}'`,
            (err, result) => {
              if (!err) {
                if (!result.rows.length) {
                  client.query(
                    `select vendors.room2 from vendors where room2 = '${req.body.room1}' OR room2 = '${req.body.room2}'`,
                    (err, result) => {
                      if (!err) {
                        if (!result.rows.length) {
                          let updateQuery = `update vendors
                         set name = '${req.body.name}',
                         password = '${req.body.password}',
                         room1 = '${req.body.room1}' ,
                         room2 = '${req.body.room2}',
                         availabler1 = ${req.body.availabler1},
                         availabler2 = ${req.body.availabler2}
                         where email = '${req.body.email}'`;

                          client.query(updateQuery, (err, result) => {
                            if (!err) {
                              res.send("ok");
                            } else {
                              console.log(err.message);
                            }
                          });
                        } else {
                          res.send("Room 2 already exists");
                        }
                      } else {
                        console.log(err.message);
                      }
                    }
                  );
                } else {
                  res.send("Room 1 already exists");
                }
              } else {
                console.log(err.message);
              }
            }
          );
        } else {
          res.send("No such vendor exists");
        }
      } else {
        console.log(err.message);
      }
    }
  );

  client.end;
});

router.get("/", async (req, res) => {
  client.query("select * from vendors", (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      err.message;
    }
  });
});

router.get("/:room", (req, res) => {
  client.query(
    `select availabler1 from vendors as v where v.room1 = ${req.body.room}`,
    (err, result) => {
      if (!err) {
        console.log(result.rows);
        if (result.rows.length) {
          console.log(result);
          console.log(result.rows[0].availabler1);

          if (result.rows[0].availabler1 === 0) {
            client.query(
              `UPDATE vendors SET availabler1 = 1 WHERE room1 = ${req.body.room}`,
              (err, result) => {
                if (!err) {
                  console.log(result.rows);
                  res.send("ok");
                }
              }
            );
          } else {
            client.query(
              `UPDATE vendors SET availabler1 = 0 WHERE room1 = ${req.body.room}`,
              (err, result) => {
                if (!err) {
                  console.log(result);
                  res.send("ok");
                }
              }
            );
          }
        } else {
          client.query(
            `select availabler2 from vendors as v where v.room2 = ${req.body.room}`,
            (err, result) => {
              if (!err) {
                console.log(result);
                if (result.rows.length) {
                  // console.log(result);
                  console.log(result.rows[0].availabler2);

                  if (result.rows[0].availabler2 === 0) {
                    client.query(
                      `UPDATE vendors SET availabler2 = 1 WHERE room2 = ${req.body.room}`,
                      (err, result) => {
                        if (!err) {
                          console.log(result);
                          res.send("ok");
                        }
                      }
                    );
                  } else {
                    client.query(
                      `UPDATE vendors SET availabler2 = 0 WHERE room2 = ${req.body.room}`,
                      (err, result) => {
                        if (!err) {
                          console.log(result);
                          res.send("ok");
                        }
                      }
                    );
                  }
                }
              }
            }
          );
        }
      } else {
        console.log(err.message);
      }
    }
  );

  client.end;
});

module.exports = router;
