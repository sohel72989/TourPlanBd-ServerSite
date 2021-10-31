const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const cors = require('cors')
port = 5000;

require('dotenv').config();

//midleware

app.use(cors());
app.use(express.json());




///connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.27tlm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// console.log(uri);

async function run() {
    try {
        await client.connect();
        // console.log('database connected');
        const database = client.db('tourism');
        const packageCollection = database.collection('package');
        const bookingCollection = database.collection('booking');



        ///get API

        app.post('/package', async (req, res) => {
            const service = req.body;
            console.log('hitting the data', service);
            const result = await packageCollection.insertOne(service);
            res.json(result);
        })


    }
    finally {
        // await client.close();
    }

}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('active node-server')
});

app.listen(port, (req, res) => {
    console.log('listening port', port);
})