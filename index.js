const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors')
port = process.env.PORT || 5000;

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
        });

        ///booking

        app.post('/booking', async (req, res) => {
            const service = req.body;
            console.log('hitting the data', service);
            const result = await bookingCollection.insertOne(service);
            res.json(result);
        })


        //Get all data
        app.get('/package', async (rq, res) => {
            const cursor = packageCollection.find({});
            const result = await cursor.toArray();
            res.json(result);

        });
        //Get all  booking data
        app.get('/myBooking', async (rq, res) => {
            const cursor = bookingCollection.find({});
            const result = await cursor.toArray();
            res.json(result);

        });
        //Updated
        //GET single Service API
        app.get('/package/updatePackage/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const package = await packageCollection.findOne(query);
            res.json(package);
        });
        // app.put('/manageAllPackage')

        //Delete
        app.delete('/package/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await packageCollection.deleteOne(query);
            res.json(result);
        });
        // booking Delete
        app.delete('/myBooking/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await bookingCollection.deleteOne(query);
            res.json(result);
        });


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