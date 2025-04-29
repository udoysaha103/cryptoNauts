require("dotenv").config();

const express = require("express");
const cors = require("cors");

const http = require("http");
const { Server } = require("socket.io");

const mongoose = require("mongoose");
import nautsModel from "./models/nautsModel";

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



app.post("/createCoin", (req, res) => {
    const item = req.body; // example data
    console.log("New coin:", item);

    const newCoin = new nautsModel(item);

    newCoin.save()
        .then(() => {
            console.log("Coin saved to database:", item);
            res.json({ status: `$${item.name} coin created` });
        })
        .catch((error) => {
            console.error("Error saving coin:", error);
            res.status(500).json({ error: "Failed to create coin" });
        });
  }
);


app.post("/updateCoin/:name/:CA", (req, res) => {
    const { name, CA } = req.params; // example data
    
    // update the coin having name with the CA
    nautsModel.findOneAndUpdate(
        { name: name },
        { contractAddress: CA },
        { new: true } // Return the updated document
    )
    .then((updatedCoin) => {
        if (updatedCoin) {
            console.log("Coin updated:", updatedCoin);
            io.emit("new-registration", { message: `${name}` });
            res.json({ status: "Coin updated", updatedCoin });
        } else {
            console.log("Coin not found:", name);
            res.status(404).json({ error: "Coin not found" });
        }
    })
    .catch((error) => {
        console.error("Error updating coin:", error);
        res.status(500).json({ error: "Failed to update coin" });
    });
});


app.get('/getLastCreatedCoin', (req, res) => {
    // find the last created coin in the database. Only 1 record is needed.
    nautsModel.findOne({}, {}, { sort: { 'createdAt': -1 } })
        .then((coin) => {
            if (coin) {
                console.log("Last created coin:", coin.name);
                res.json(coin);
            } else {
                console.log("No coins found in the database.");
                res.status(404).json({ error: "No coins found" });
            }
        })
        .catch((error) => {
            console.error("Error fetching last created coin:", error);
            res.status(500).json({ error: "Failed to fetch last created coin" });
        });
  }
);


app.get('/getRemainingCoins', (req, res) => {
    // find the records that has no contract address
    nautsModel.find({ contractAddress: null })
        .then((coins) => {
            console.log("Remaining coins:", coins.length);
            res.json(coins.length);
        })
        .catch((error) => {
            console.error("Error fetching remaining coins:", error);
            res.status(500).json({ error: "Failed to fetch remaining coins" });
        });
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