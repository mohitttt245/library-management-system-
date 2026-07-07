const express = require("express");
let {users} = require("../data/users.json")


const routers = express.Router();




// app.all('*',(req, res)=>{
//     res.status(500).json({
//         message:"Not built yet"
//     })
// })

// get all users
routers.get('/users',(req, res)=>{
    res.status(200).json({
        success:true,
        data: users
    })
})




// get user by ID
routers.get('/users/:id',(req,res)=>{

    const {id} = req.params;
    const user= users.find((each)=>each.id === id)

    if(!user){
        return res.status(404).json({
            success: false,
            message: `user not found ${id}`
        })
    }

    res.status(200).json({
        success:true,
        data:user
    })
})



// create user
routers.post('/users',(req,res)=>{
    const {id ,name, email, surname , subscriptionType, subscriptionDate} = req.body;

    if(!id || !name || !email || !surname || !subscriptionType || !subscriptionDate){
        return res.status(400).json({
            success:false,
            message:"Please provide all the required fields"
        });
    }

    const existingUser = users.find((user) => user.id === id);

    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "User already exists"
        });
    }

    users.push({id, name, email, surname, subscriptionType, subscriptionDate})

    res.status(201).json({
        success:true,
        message:"User created successfully"
    })

})


// update user
routers.put('/users/:id',(req,res)=>{

    const {id} = req.params;
    const data = req.body;

    const user = users.find((each)=>each.id === id)
    if(!user){
        return res.status(404).json({
            success: false,
            message: `user not found ${id}`
        })
    }

    users = users.map((each)=>{
        if(each.id === id){
            return{
                ...each,
                ...data
            }
        }

        return each;
    })

    res.status(200).json({
        success:true,
        data:users,
        message:"User updated successfully"
    })
    
});



// delete user
routers.delete('/users/:id',(req,res)=>{

    const {id} = req.params;

    const user = users.find((each)=>each.id === id)
    if(!user){
        return res.status(404).json({
            success: false,
            message: `user not found ${id}`
        })
    }

    users = users.filter((each)=>each.id !== id)

    res.status(200).json({
        success:true,
        data:users,
        message:"User deleted successfully"
    })

});


exports = module.exports = routers;
