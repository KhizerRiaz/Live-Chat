// const Kafka = require("node-rdkafka"); // see: https://github.com/blizzard/node-rdkafka
// const externalConfig = require("./config");
// // const router = require("./producer");
// var val;
// const CONSUMER_GROUP_ID = "node-consumer-2";
// // construct a Kafka Configuration object understood by the node-rdkafka library
// // merge the configuration as defined in config.js with additional properties defined here
// const kafkaConf = {
//   ...externalConfig.kafkaConfig,
//   ...{
//     "group.id": CONSUMER_GROUP_ID,
//     "socket.keepalive.enable": true,
//     debug: "generic,broker,security",
//   },
// };

// const topics = [externalConfig.topic];

// const express = require("express");
// const router = express.Router();
// const client = require("./connection.js");
// router.use(express.json());

// // client.connect();
// var stream = new Kafka.KafkaConsumer.createReadStream(
//   kafkaConf,
//   { "auto.offset.reset": "earliest" },
//   {
//     topics: topics,
//   }
// );

// // console.log("dsa");
// stream.on("data", function (message) {
//   //console.log(`Consumed message on Stream: ${message.value.toString()}`);
//   console.log(message.value.toString());
//   //   val = message.value.json();
//   //   value = message.value.toString();
//   //   console.log(JSON.parse(message.value).room);
//   //   val.push(message.value.toString());
//   //   val.push(JSON.parse(message.value));
//   val = JSON.parse(message.value);
//   //   console.log(val);
// try {
//   client.query(
//     `insert into chat (room , author , message , email , time , vendor) values ('${val.room}' , '${val.author}' , '${val.message}' , '${val.email}' , '${val.time}' , ${val.vendor})`,
//     (err, result) => {
//       if (err) {
//         console.log(err.message);
//       }
//     }
//   );
//   client.end;
//   // console.log(val);
// } catch (error) {
//   console.log(error);
// }

//   //   console.log(val);
//   //   module.exports = val;
//   // the structure of the messages is as follows:
//   //   {
//   //     value: Buffer.from('hi'), // message contents as a Buffer
//   //     size: 2, // size of the message, in bytes
//   //     topic: 'librdtesting-01', // topic the message comes from
//   //     offset: 1337, // offset the message was read from
//   //     partition: 1, // partition the message was on
//   //     key: 'someKey', // key of the message if present
//   //     timestamp: 1510325354780 // timestamp of message creation
//   //   }
// });

// // setTimeout()

// console.log(`Stream consumer created to consume from topic ${topics}`);

// stream.consumer.on("disconnected", function (arg) {
//   console.log(`The stream consumer has been disconnected`);
//   process.exit();
// });

// // automatically disconnect the consumer after 30 seconds
// // setTimeout(function () {
// //     stream.consumer.disconnect();
// // }, 30000)

// // console.log(val);
// // console.log(val);

// module.exports = router;
// var val;
// const Kafka = require("node-rdkafka"); // see: https://github.com/blizzard/node-rdkafka
// const externalConfig = require("./config");

// const CONSUMER_GROUP_ID = "node-consumer-2";
// // construct a Kafka Configuration object understood by the node-rdkafka library
// // merge the configuration as defined in config.js with additional properties defined here
// const kafkaConf = {
//   ...externalConfig.kafkaConfig,
//   ...{
//     "group.id": CONSUMER_GROUP_ID,
//     "socket.keepalive.enable": true,
//     debug: "generic,broker,security",
//   },
// };

// const topics = [externalConfig.topic];

// var stream = new Kafka.KafkaConsumer.createReadStream(
//   kafkaConf,
//   { "auto.offset.reset": "earliest" },
//   {
//     topics: topics,
//   }
// );

// stream.on("data", function (message) {
//   //console.log(`Consumed message on Stream: ${message.value.toString()}`);
//   console.log(message.value.toString());

//   val = JSON.parse(message.value);
//   try {
//     client.query(
//       `insert into chat (room , author , message , email , time , vendor) values ('${val.room}' , '${val.author}' , '${val.message}' , '${val.email}' , '${val.time}' , ${val.vendor})`,
//       (err, result) => {
//         if (err) {
//           console.log(err.message);
//         }
//       }
//     );
//     client.end;
//     // console.log(val);
//   } catch (error) {
//     console.log(error);
//   }
// the structure of the messages is as follows:
//   {
//     value: Buffer.from('hi'), // message contents as a Buffer
//     size: 2, // size of the message, in bytes
//     topic: 'librdtesting-01', // topic the message comes from
//     offset: 1337, // offset the message was read from
//     partition: 1, // partition the message was on
//     key: 'someKey', // key of the message if present
//     timestamp: 1510325354780 // timestamp of message creation
//   }
// });

// console.log(`Stream consumer created to consume from topic ${topics}`);

// stream.consumer.on("disconnected", function (arg) {
//   console.log(`The stream consumer has been disconnected`);
//   process.exit();
// });

// automatically disconnect the consumer after 30 seconds
// setTimeout(function () {
//     stream.consumer.disconnect();
// }, 30000)

var val;
const express = require("express");
const client = require("./connection.js");
const Kafka = require("node-rdkafka");
const externalConfig = require("./config");

const CONSUMER_GROUP_ID = "node-consumer-1";

const kafkaConf = {
  ...externalConfig.kafkaConfig,
  ...{
    "group.id": CONSUMER_GROUP_ID,
    "socket.keepalive.enable": true,
    debug: "generic,broker,security",
  },
};
client.connect();
const topics = [externalConfig.topic];

var stream = new Kafka.KafkaConsumer.createReadStream(
  kafkaConf,
  { "auto.offset.reset": "earliest" },
  {
    topics: topics,
  }
);

stream.on("data", function (message) {
  console.log(`Consumed message on Stream: ${message.value.toString()}`);

  console.log(message.value.toString());

  val = JSON.parse(message.value);

  try {
    // console.log("bc");
    client.query(
      `insert into chat (room , author , message , email , time , vendor) values ('${val.room}' , '${val.author}' , '${val.message}' , '${val.email}' , '${val.time}' , ${val.vendor})`,
      (err, result) => {
        if (err) {
          console.log(err.message);
        }
      }
    );
    client.end;
    // console.log(val);
  } catch (error) {
    console.log(error);
  }

  // value = message.value.toString();
  // console.log(JSON.parse(message.value).msg);

  // val = JSON.parse(message.value);
  // console.log(val);
});

console.log(`Stream consumer created to consume from topic ${topics}`);

stream.consumer.on("disconnected", function (arg) {
  console.log(`The stream consumer has been disconnected`);
  process.exit();
});

setTimeout(function () {
  stream.consumer.disconnect();
}, 3600000);
