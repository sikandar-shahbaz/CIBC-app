require('dotenv').config()
const PORT = process.env.PORT || 3000
const mongoPassword = process.env.mongoPass
const express = require('express')
const app  = express()
const mongoose = require("mongoose")
const dbUrl = `mongodb+srv://testingMongoApp:${mongoPassword}@cluster0.p2jcq9j.mongodb.net/?retryWrites=true&w=majority`
const ChannelModel = require('./models/channel')
const cors = require('cors')
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose
    .connect(dbUrl, connectionParams)
    .then(() => {
        console.info("Connected To the DB")
    })
    .catch((e) => {
        console.log(e)
    });

app.use(cors());

app.listen(PORT, () => {
    console.log('Listening to PORT: ' + PORT);
});

app.get("/transactions", (req, res) => {
    const startDate = new Date(req.query.startDate ? req.query.startDate : 0).getTime();
    const endDate = new Date(req.query.endDate ? req.query.endDate : Date.now()).getTime();

    ChannelModel.find({
        date: { 
            $gt: startDate,
            $lt: endDate 
        }
    }, (error, data) => {
    if(error) {
        res.send(error);
        console.log(error)
    } else {
        res.send(data);
        console.log('GET Success')
    }
   })
   .sort({date:1})
   .select('-sender')
   .select('-recipient');

});

app.post("/transactions", (req, res) => {
    let {_id, comments} = req.body;
    console.log(req.body)
    ChannelModel.findOneAndUpdate(
        {_id: _id},
        {$set: {"Comments": comments}}, 
        (error) => {
            if(error) {
                res.send(false);
                console.log(error)
            } else {
                res.send(true);
                console.log('POST Success')
            }
        }
    )
});