const express = require('express')

const app = express()

app.use(express.json())  
// This Above line is Middleware to parse JSON bodies 
// It tells Express to read JSON data sent by the user and convert it into a JavaScript object

const notes = []  

app.post('/notes',(req,res)=>{
    console.log(req.body)
    notes.push(req.body)
    res.send("Notes Created")
})  // Endpoint to create a new note

app.get('/notes',(req,res)=>{
    res.send(notes)
})  // Endpoint to get all notes

app.listen(8000,()=>{
    console.log('Server is running on port 8000')
})