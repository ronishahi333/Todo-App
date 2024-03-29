const express = require('express');
const cors = require('cors');
const mongodb = require('mongodb').MongoClient;
const multer = require('multer');
const { MongoClient, ObjectId } = require('mongodb');


const app = express();
app.use(cors());

const CONNECTION_STRING = "mongodb+srv://username:password@cluster0.becrx6n.mongodb.net/?retryWrites=true&w=majority"

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

// app.put('/updatetodo/:id', multer().none(), (request, response) => {
//     const todoId = new ObjectId(request.params.id);
//     const updatedDescription = request.body.updatedNotes;
//     console.log("From Server",todoId);

//     database.collection("todocollections").updateOne(
//         { _id: todoId },
//         { $set: { description: updatedDescription } },
//         (error, result) => {
//             if (error) {
//                 response.status(500).json({ error: 'Internal Server Error' });
//             } else {
//                 response.json("Edit Successfully");
//             }
//         }
//     );
// });

app.delete('/deletetodo',(request,response)=>{
    database.collection("todocollections").deleteOne({
        id:request.query.id
    })
    response.json("Delete Sucessfully")
})