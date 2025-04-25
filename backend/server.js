require("dotenv").config();

const express = require("express");
const cors = require("cors");

const http = require("http");
const { Server } = require("socket.io");

const mongoose = require("mongoose");

const app = express();

const allowedOrigins = [
    `http://${process.env.CLIENT_URL}`,
    `https://${process.env.CLIENT_URL}`,
    `http://www.${process.env.CLIENT_URL}`,
    `https://www.${process.env.CLIENT_URL}`
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, // Allow cookies or auth headers if needed
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow necessary headers
}));

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST"],
  },
});

// Store connected clients
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


app.post("/register", (req, res) => {
    const item = req.body; // example data
    console.log("New registration:", item);
  
    // Notify all connected clients
    io.emit("new-registration", { message: "🎉 New item registered!" });
  
    res.json({ status: "registered and notified" });
});


// const userRouter = require("./routes/users");
// app.use("/user", userRouter);


// connect to the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    server.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });