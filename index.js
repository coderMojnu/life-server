const express = require('express');
const ObjectId = require('mongodb').ObjectID;
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
//app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require('dotenv').config();
const port = 5000;


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jvd1e.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });;

client.connect(err => {
  //insert my day
  const dailyWorksCollection = client.db("jibonerHisab").collection("dailyUpdate");
  app.post("/addMyDay", (req, res) => {
    const works = req.body;
    dailyWorksCollection.insertOne(works)
    .then(result => {
      console.log('work update successfully');
    })
  })
  //read my day
  app.get('/myDays', (req, res) => {
    dailyWorksCollection.find({})
    .toArray( (err, documents) => {
      res.send(documents);
    })
  })
//   //update data
//   app.get('/myDay/:id', (req, res) => {
//     dailyWorksCollection.find({_id: ObjectId(req.params.id)})
//     .toArray( (err, documents) => {
//       res.send(documents[0]);
//     })
//   })
//   app.patch('/update/:id', (req, res) => {
//         dailyWorksCollection.updateOne({_id: ObjectId(req.params.id)}, 
//         {
//             $set: {date: req.body.date, namaj: req.body.namaj, priorityWork1: req.body.priorityWork1, priorityWork2: req.body.priorityWork2, priorityWork3: req.body.priorityWork3, lessImportantWork1: req.body.lessImportantWork1, lessImportantWork2: req.body.lessImportantWork2, workDone: req.body.workDone, valoKaj: req.body.valoKaj, ayat: req.body.ayat, expenditure: req.body.expenditure, hadith: req.body.hadith, motivation: req.body.motivation, idea: req.body.idea, gonah: req.body.gonah}
//         })
//         .then(result =>{
//             //console.log(result);
//             res.send(result.modifiedCount > 0);
//         })
//     })
});
app.get('/', (req, res) => {
     res.send("I am working, continue your work")
  })
app.listen(process.env.PORT || port)