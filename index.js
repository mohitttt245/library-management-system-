const express = require("express");


const app = express();

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