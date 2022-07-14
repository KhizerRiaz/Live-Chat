// const express = require("express");
// const router = express.Router();
// const client = require("./../connection.js");

// router.use(express.json());

// const query = require("./../models/chat.js");

// router.post("/", async (req, res) => {
//   client.query(query, (err, result) => {});

//   client.query(
//     `select name from vendors where name = '${req.body.author}'`,
//     (err, result) => {
//       if (err) {
//         console.log(err.message);
//       } else {
//         if (result.rows.length) {
//           //   console.log("a");;
//           client.query(
//             `insert into chat (room , author , message , email , time , vendor) values (${req.body.room} , '${req.body.author}' , '${req.body.message}' , '${req.body.email}' , '${req.body.time}' , true)`,
//             (err, message) => {
//               if (err) console.log(err.message);
//               else res.send("Vendor it is");
//             }
//           );
//         } else {
//           //   console.log("b");
//           client.query(
//             `insert into chat (room , author , message , email , time , vendor) values (${req.body.room} , '${req.body.author}' , '${req.body.message}' , '${req.body.email}' , '${req.body.time}' , false)`,
//             (err, message) => {
//               {
//                 if (err) console.log(err.message);
//                 else res.send("done");
//               }
//             }
//           );
//         }
//       }
//     }
//   );
//   //   client.query(`insert into chat values (room , author , message , email , time) ` , (err , result) =>{

//   //   })

//   client.end;
// });

// // "id" SERIAL ,
// // "room" integer ,
// // "author" VARCHAR(100) ,
// // "message" VARCHAR(100) ,
// // "email" VARCHAR(100) ,
// // "time" VARCHAR(100) ,
// // vendor boolean,
// // PRIMARY KEY ("id") ,
// // FOREIGN KEY (room) REFERENCES vendor_room(room)

// // router.post("/", async (req, res) => {
// //   res.send("MKC");
// // });

// module.exports = router;

var dict = {
  ab: "abc",
};

console.log(dict);
