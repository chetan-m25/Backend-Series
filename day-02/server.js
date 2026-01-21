const express = require("express")

const app = express() // instance of server will create by this line

app.get("/",(req,res)=>{
    res.send("Hello World")
})
app.get("/home",(req,res)=>{
    res.send("This is Home page")
})

app.listen(8000) // serever will start by this line
console.log("Server is running on port 8000");