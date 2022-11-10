const mongoose = require("mongoose")

const channelSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    date: {
        type: Number
    },
    Amount: {
        type: Number,
    },
    CurrencyCD: {
        type: String
    },
    Comments: {
        type: String
    },
    status: {
        type: String
    }
});

const ChannelModel = mongoose.model('Channel', channelSchema)

module.exports = ChannelModel