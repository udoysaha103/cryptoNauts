require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const http = require("http");
const { Server } = require("socket.io");

const mongoose = require("mongoose");
const nautsModel = require("./models/nautsModel"); // Import your model

const { Connection, PublicKey, clusterApiUrl } = require('@solana/web3.js');
const { getParsedTokenAccountsByOwner, TOKEN_PROGRAM_ID } = require('@solana/spl-token');
// Initialize connection to the Solana mainnet
// const connection = new Connection('https://api.mainnet-beta.solana.com', {
//   commitment: 'confirmed',
//   maxSupportedTransactionVersion: 0,
// });
const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');


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
        { contractAddress: CA, updatedAt: new Date() }, // Update contractAddress and updatedAt
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
    // find the last created coin in the database that has a valid CA. Only 1 record is needed.
    nautsModel.findOne({ contractAddress: { $ne: null } })
        .sort({ updatedAt: -1 })
        .then((coin) => {
            if (coin) {
                // console.log("Last created coin:", coin);
                res.json(coin.name);
            } else {
                console.log("No coins found with a valid contract address.");
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
            // console.log("Remaining coins:", coins.length);
            res.json(coins.length);
        })
        .catch((error) => {
            console.error("Error fetching remaining coins:", error);
            res.status(500).json({ error: "Failed to fetch remaining coins" });
        });
});


app.get('/getDetails/:name', (req, res) => {
    const { name } = req.params; // example data

    // find the coin having name
    nautsModel.findOne({ name: name })
        .then((coin) => {
            if (coin) {
                res.json(coin);
            } else {
                console.log("Coin not found:", name);
                res.status(404).json({ error: "Coin not found" });
            }
        })
        .catch((error) => {
            console.error("Error fetching coin details:", error);
            res.status(500).json({ error: "Failed to fetch coin details" });
        });
});


app.get('/validateCoin/:ticker', async (req, res) => {
    const { ticker } = req.params; // example data
    const MIN_USD_VALUE = 50;

    async function getTokensByTicker(ticker) {
        const res = await axios.get(`https://api.dexscreener.com/latest/dex/search?q=${ticker}`);
        const solanaTokens = res.data.pairs.filter(pair => pair.chainId === 'solana');
        return solanaTokens;
    }


    async function getMintCreationDetails(mintAddress) {
        try {
          const mintPubkey = new PublicKey(mintAddress);
          
          
          // Fetch signatures associated with the mint address
          const signatures = await connection.getSignaturesForAddress(mintPubkey, { limit: 10 });
          
          if (signatures.length === 0) {
            console.log(`No transactions found for mint: ${mintAddress}`);
            return null;
          }
      
          // Assume the earliest transaction is the creation transaction
          const creationSignature = signatures[signatures.length - 1].signature;
          
          // Fetch the transaction details
          const tx = await connection.getTransaction(creationSignature, {
            maxSupportedTransactionVersion: 0,
          });
      
          if (!tx) {
            console.log(`Transaction not found for signature: ${creationSignature}`);
            return null;
          }
      
          // Extract the block time and fee payer (assumed to be the developer wallet)
          const creationTime = tx.blockTime ? new Date(tx.blockTime * 1000).toISOString() : 'Unknown';
          const devWallet = tx.transaction.message.accountKeys[0].toBase58();
      
          return devWallet;
        } catch (error) {
          console.error(`Error processing mint ${mintAddress}:`, error.message);
          return null;
        }
    }


    async function getNautsTokenBalance(walletAddress, nautsMintAddress = process.env.BASE_COIN_ADDRESS) {
        try {
          const ownerPublicKey = new PublicKey(walletAddress);
          const mintPublicKey = new PublicKey(nautsMintAddress);
      
          const tokenAccounts = await connection.getParsedTokenAccountsByOwner(ownerPublicKey, {
            mint: mintPublicKey,
          });
      
          if (tokenAccounts.value.length === 0) return 0;
      
          const tokenAmount = tokenAccounts.value[0].account.data.parsed.info.tokenAmount;
          return parseFloat(tokenAmount.uiAmountString);
        } catch (error) {
          console.error(`Error fetching Nauts balance for wallet ${walletAddress}:`, error.message);
          return 0;
        }
    }


    async function getTokenPriceUSD(tokenMintAddress) {
        try {
          // Search for the token using its mint address
          const response = await axios.get(`https://api.dexscreener.com/latest/dex/search?q=${tokenMintAddress}`);
          const pairs = response.data.pairs;
      
          if (!pairs || pairs.length === 0) {
            console.warn(`No trading pairs found for token address: ${tokenMintAddress}`);
            return null;
          }
      
          // Filter pairs on the Solana chain
          const solanaPairs = pairs.filter(pair => pair.chainId === 'solana');
      
          if (solanaPairs.length === 0) {
            console.warn(`No Solana trading pairs found for token address: ${tokenMintAddress}`);
            return null;
          }
      
          // Select the first pair (you can implement additional logic to choose the most relevant pair)
          const selectedPair = solanaPairs[0];
      
          // Extract the USD price
          const priceUsd = parseFloat(selectedPair.priceUsd);
      
          return priceUsd;
        } catch (error) {
          console.error(`Error fetching price for token address ${tokenMintAddress}:`, error.message);
          return null;
        }
      }


    try{
        // Fetch the Nauts token price in USD
        const NAUTS_PRICE_USD = await getTokenPriceUSD(process.env.BASE_COIN_ADDRESS);
        // console.log('Nauts token price in USD:', NAUTS_PRICE_USD);
        if (!NAUTS_PRICE_USD) {
            console.error('Failed to fetch Nauts token price.');
            return res.status(500).json({ error: 'Failed to fetch Nauts token price.' });
        }

        const tokens = await getTokensByTicker(ticker);

        // sort the tokens by pairCreatedAt in ascending order
        tokens.sort((a, b) => a.pairCreatedAt - b.pairCreatedAt);

        // get the dev wallet for one token at a time, find its holdings and then find if the dev wallet holds Nauts token and how much, if they have 50$ of Nauts token, then return that contract address or check the next dev wallet
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            const mintAddress = token.baseToken.address; // Assuming baseToken is the mint address
            const devWallet = await getMintCreationDetails(mintAddress);

            if (!devWallet) {
                console.log(`No dev wallet found for mint ${mintAddress}`);
                continue; // Skip to the next token if no dev wallet is found
            }
            
            const nautsBalance = await getNautsTokenBalance(devWallet);
            const nautsValue = nautsBalance * NAUTS_PRICE_USD;

            if (nautsValue >= MIN_USD_VALUE) {
                console.log(`Dev wallet ${devWallet} holds ${nautsBalance} Nauts tokens worth $${nautsValue}`);
                return res.json({ status: "Valid", contractAddress: token.contractAddress });
            }

            // wait for 10 seconds before checking the next token
            await new Promise(resolve => setTimeout(resolve, 10000));
        }
        
        res.json(tokens);
    }
    catch (error) {
        console.error("Error fetching tokens:", error);
        res.status(500).json({ error: "Failed to fetch tokens" });
    }
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