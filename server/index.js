const express = require('express');
const cors = require('cors');
const mongodb = require('mongodb').MongoClient;
const multer = require('multer');
const { MongoClient } = require('mongodb');


const app = express();
app.use(cors());

const CONNECTION_STRING = "mongodb+srv://ronishahi333:Aussiesmaxwell32@cluster0.becrx6n.mongodb.net/?retryWrites=true&w=majority"

const databaseName = "tododb";
let database = "";


app.listen(5038,()=>{
    MongoClient.connect(CONNECTION_STRING,(error,client)=>{
        database=client.db(databaseName);
        console.log("Connection Sucessfull")
    });
})

app.get('/todo',(request,response)=>{
    database.collection("todocollections").find({}).toArray((error,result)=>{
        response.send(result)
    })
})

app.post('/addtodo',multer().none(),(request,response)=>{
    database.collection("todocollections").count({},function(error,numofDocs){
        database.collection("todocollections").insertOne({
            id:(numofDocs+1).toString(),
            description:request.body.addNotes
        });
        response.json("Added Sucessfully")
    })
})

app.put('/updatetodo/:id', multer().none(), (request, response) => {
    const todoId = request.body.id;
    //const todoId = request.params.id;
    const updatedDescription = request.body.updatedNotes;

    database.collection("todocollections").updateOne(
        { id: todoId },
        { $set: { description: updatedDescription } },
        (error, result) => {
            if (error) {
                response.status(500).json({ error: 'Internal Server Error' });
            } else {
                response.json("Edit Successfully");
            }
        }
    );
});

app.delete('/deletetodo',(request,response)=>{
    database.collection("todocollections").deleteOne({
        id:request.query.id
    })
    response.json("Delete Sucessfully")
})