const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const client = require("./connection.js");

client.connect();

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5000"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Origin",
    "X-Requested-With",
    "Accept",
    "Accept-Language",
    "Accept-Encoding",
    "Accept-Charset",
    "Content-Length",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Credentials",
    "Access-Control-Allow-Methods",
    "Access-Control-Allow-Headers",
    "Access-Control-Expose-Headers",
    "Access-Control-Max-Age",
    "Access-Control-Allow-Credentials",
  ],
  exposedHeaders: [
    "Content-Type",
    "Authorization",
    "Origin",
    "X-Requested-With",
    "Accept",
    "Accept-Language",
    "Accept-Encoding",
    "Accept-Charset",
    "Content-Length",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Credentials",
    "Access-Control-Allow-Methods",
    "Access-Control-Allow-Headers",
    "Access-Control-Expose-Headers",
    "Access-Control-Max-Age",
    "Access-Control-Allow-Credentials",
  ],
};
app.use(cors(corsOptions));
const server = http.createServer(app);
const io = require("socket.io")(5000, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5000"],
    methods: ["GET", "POST"],
  },
});
// const io = require("socket.io")(5000);
var value, value2;

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("send_message", async (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log(data.room, typeof data.room, "rec");
    valmsg = data.message;
    rommIn = data.room;
    authr = data.author;
    time = data.time;
    sendmsg(value);
    console.log(valmsg);
    console.log(data.room);
  });
  const sendmsg = (value) => {
    console.log(value);
    // socket.to(value.room).emit("receive_message", value);

    // const { Kafka } = require('kafkajs')
    // const Chance = require('chance');
    // const chance = new Chance();

    // const kafka = new Kafka({
    //   clientId: 'my-producer',
    //   brokers: ['localhost:9092']
    // })

    // const producer = kafka.producer()
    // const topic = 'animals';

    // const producerMessage = async() =>{

    //     try {
    //               value2 = "HELLO"
    //               value = "| Time: " + time + " - Username: " + authr + " - Message: [ " + valmsg + " ] - Room: " + rommIn + " |"
    //               await producer.send({
    //                 topic,
    //                 messages: [
    //                   { value },
    //                 ],
    //             });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // const run = async () => {
    //   // Producing
    //   await producer.connect()
    //   setInterval(producerMessage, 1000);
    // }

    // run().catch(console.error)
  };
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data} :) `);
  });

  // socket.on("send_message", (data) => {
  // socket.to(data.room).emit("receive_message", data);
  // });

  socket.on("leave_room", () => {
    console.log("User Disconnected");
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

app.use(express.json());

const clients = require("./routes/clients.js");
app.use("/clients", clients);

const vendors = require("./routes/vendors.js");
app.use("/vendors", vendors);

const vendor_room = require("./routes/vendor_room.js");
app.use("/vendor_room", vendor_room);

const producer1 = require("./producer1.js");
app.use("/chat", producer1);

const producer2 = require("./producer2.js");
app.use("/producer2", producer2);

// const chat = require("./routes/chat.js");
// app.use("/chat", chat);

const port = 3004;
app.listen(port, () => console.log(`Listening on port ${port}...`));
