const mongoose = require('mongoose');

const nautSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ticker: { type: String, required: true },
    rank: { type: String, required: true },
    rankDesc: { type: String, required: true },
    desc: { type: String, required: true },
    contractAddress: { type: String, required: true },

    timestamp: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const nautsModel = mongoose.model("nauts", nautSchema);
module.exports = nautsModel;