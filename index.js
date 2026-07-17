const express = require("express");
const dotenv = require("dotenv");


// import database connection
const DbConnection = require('./databaseConnection')

dotenv.config();

const app = express();

DbConnection();

const port = 3000;

app.use(express.json());

// home route
app.get('/',(req,res)=>{
    res.status(200).json("Home page")
})



app.use('/',require('./routes/users'))
app.use('/',require('./routes/books'))





app.listen(port,()=>{
    console.log(`Server runing on http://localhost:${port}`)
});