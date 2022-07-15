const express = require("express");
const router = express.Router();
const client = require("./../connection.js");
const query = require("./../models/vendor_room.js");

router.use(express.json());

router.post("/joinroom", async (req, res) => {
  client.query(
    `update vendor_room set available = false where room = '${req.body.room}'`,
    (err, result) => {
      if (err) {
        console.log(err.message);
      } else {
        res.send("ok");
      }
    }
  );
  // client.end;
});

router.post("/leaveroom", async (req, res) => {
  client.query(
    `update vendor_room set available = true where room = '${req.body.room}' and available = false`,
    (err, result) => {
      if (err) {
        console.log(err.message);
      } else {
        // console.log(req.body.room);
        console.log("jhbjhb");
        res.send("ok");
      }
    }
  );
  client.end;
});

router.post("/", async (req, res) => {
  client.query(query, (err, result) => {});

  client.query(
    `select vendors.id , vendors.room1 , vendors.room2 ,vendors.availabler1,vendors.availabler2 from vendors`,
    (err, result) => {
      if (!err) {
        console.log(result.rows[0]["room1"]);
        //   console.log(result.length);

        for (i = 0; i < result.rows.length; i++) {
          // console.log(
          //   result[i]["id"],
          //   result[i]["room1"],
          //   result[i]["room2"]
          // );

          client.query(
            `insert into vendor_room (vendor_id , room , available)
          values ('${result.rows[i]["id"]}','${result.rows[i]["room1"]}' , ${result.rows[i]["availabler1"]})`,

            (err, result) => {
              if (!err) {
              } else {
                console.log(err.message);
              }
            }
          );

          client.query(
            `insert into vendor_room (vendor_id , room , available)
          values ('${result.rows[i]["id"]}','${result.rows[i]["room2"]}' , ${result.rows[i]["availabler2"]})`,
            (err, result) => {
              if (!err) {
              } else {
                console.log(err.message);
              }
            }
          );
        }

        //   res.send(result);
      } else {
        console.log(err.message);
      }
    }
  );

  res.send("DONE");
  client.end;
});

router.get("/", async (req, res) => {
  client.query(
    "select room from vendor_room where available = false",
    (err, result) => {
      res.send(result.rows[0].room);
    }
  );
  client.end;
});

// router.get("/", async (req, res) => {
//   client.query(`select * from vendors`, (err, result) => {
//     if (!err) {
//       res.send(result);
//     } else {
//       console.log(err.message);
//     }
//   });
//   client.end;
// });

module.exports = router;
