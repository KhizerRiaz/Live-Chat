const Kafka = require("node-rdkafka");
// read the KAFKA Brokers and KAFKA_TOPIC values from the local file config.js
const externalConfig = require("./config");
// const func = require("./index.js");
// var func = require("./index.js");
const express = require("express");
const router = express.Router();
const client = require("./connection.js");

router.use(express.json());

const query = require("./models/chat.js");
// func();
const messageData = {};

// const messageData = {
//   room: "room1",
//   author: "Chaand",
//   message: "Hey",
//   time:
//     new Date(Date.now()).getHours() +
//     ":" +
//     new Date(Date.now()).getMinutes() +
//     ":" +
//     new Date(Date.now()).getSeconds(),
//   email: "Chaand@whatever",
//   vendor: true,
// };
// client.connect();
router.post("/", async (req, res) => {
  console.log("cc");
  messageData.room = req.body.room;
  messageData.author = req.body.author;
  messageData.message = req.body.message;
  messageData.time =
    new Date(Date.now()).getHours() +
    ":" +
    new Date(Date.now()).getMinutes() +
    ":" +
    new Date(Date.now()).getSeconds();
  messageData.email = req.body.email;

  client.query(query, (err, result) => {});

  client.query(
    `select name from vendors where name = '${req.body.author}'`,
    (err, result) => {
      if (err) {
        console.log(err.message);
      } else {
        if (result.rows.length) {
          messageData.vendor = true;
        } else messageData.vendor = false;
      }
    }
  );
  client.end;

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

  const kafkaConf = {
    ...externalConfig.kafkaConfig,
    ...{
      "socket.keepalive.enable": true,
      debug: "generic,broker,security",
    },
  };
  const messageBatchSize = 3; // number of messages to publish in one burst
  const topic = externalConfig.topic;
  //   console.log(externalConfig.topic);

  // create a Kafka Producer - connected to the KAFKA_BROKERS defined in config.js
  const producer = new Kafka.Producer(kafkaConf);
  prepareProducer(producer, topic);
  // initialize the connection of the Producer to the Kafka Cluster
  producer.connect();

  res.send("ok");
  //   func();
});

// function to generate a message
//const generateMessage = i => new Buffer.from(`Generated a happy message - number ${i}`);
const generateMessage = () => new Buffer.from(JSON.stringify(messageData));

// function generateAndProduceMessages(arg) {
//     for (var i = 0; i < messageBatchSize; i++) {
//         producer.produce(topic, -1, generateMessage(i), i)
//     }
//     console.log(`producer ${arg.name} is done producing messages to Kafka Topic ${topic}.`)
// }
function generateAndProduceMessages(producer, messageData, topic) {
  producer.produce(topic, -1, generateMessage());
}

// construct a Kafka Configuration object understood by the node-rdkafka library
// merge the configuration as defined in config.js with additional properties defined here

function prepareProducer(producer, topic) {
  // event handler attached to the Kafka Producer to handle the ready event that is emitted when the Producer has connected sucessfully to the Kafka Cluster
  producer.on("ready", function (arg) {
    console.log(
      `Producer connection to Kafka Cluster is ready; message production starts now`
    );
    generateAndProduceMessages(producer, messageData, topic);
    // after 10 seconds, disconnect the producer from the Kafka Cluster
    setTimeout(() => producer.disconnect(), 1000000);
  });

  producer.on("disconnected", function (arg) {
    process.exit();
  });

  producer.on("event.error", function (err) {
    console.error(err);
    process.exit(1);
  });
  // This event handler is triggered whenever the event.log event is emitted, which is quite often
  producer.on("event.log", function (log) {
    // uncomment the next line if you want to see a log message every step of the way
    //console.log(log);
  });
}

module.exports = router;
