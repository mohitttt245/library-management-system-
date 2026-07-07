const express = require("express");

const app = express();

const port = 3000;

app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).json("Home page")
})

// app.all('*',(req, res)=>{
//     res.status(500).json({
//         message:"Not built yet"
//     })
// })

app.listen(port,()=>{
    console.log(`Server runing on http://localhost:${port}`)
});