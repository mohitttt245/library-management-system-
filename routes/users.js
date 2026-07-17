const express = require("express");
let {users} = require("../data/users.json")

const {getAllUsers, getUserById, addNewUser, updateUserById, deleteUserById, getSubscriptionDetails} = require("../controllers/user-controller");


const routers = express.Router();




// app.all('*',(req, res)=>{
//     res.status(500).json({
//         message:"Not built yet"
//     })
// })

// get all users
// routers.get('/users',(req, res)=>{
//     res.status(200).json({
//         success:true,
//         data: users
//     })
// })

routers.get('/users', getAllUsers);




// get user by ID
// routers.get('/users/:id',(req,res)=>{

//     const {id} = req.params;
//     const user= users.find((each)=>each.id === id)

//     if(!user){
//         return res.status(404).json({
//             success: false,
//             message: `user not found ${id}`
//         })
//     }

//     res.status(200).json({
//         success:true,
//         data:user
//     })
// })

routers.get('/users/:id', getUserById);





// create user
// routers.post('/users',(req,res)=>{
//     const {id ,name, email, surname , subscriptionType, subscriptionDate} = req.body;

//     if(!id || !name || !email || !surname || !subscriptionType || !subscriptionDate){
//         return res.status(400).json({
//             success:false,
//             message:"Please provide all the required fields"
//         });
//     }

//     const existingUser = users.find((user) => user.id === id);

//     if (existingUser) {
//         return res.status(400).json({
//             success: false,
//             message: "User already exists"
//         });
//     }

//     users.push({id, name, email, surname, subscriptionType, subscriptionDate})

//     res.status(201).json({
//         success:true,
//         message:"User created successfully"
//     })

// })

routers.post('/users', addNewUser);




// update user
// routers.put('/users/:id',(req,res)=>{

//     const {id} = req.params;
//     const data = req.body;

//     const user = users.find((each)=>each.id === id)
//     if(!user){
//         return res.status(404).json({
//             success: false,
//             message: `user not found ${id}`
//         })
//     }

//     users = users.map((each)=>{
//         if(each.id === id){
//             return{
//                 ...each,
//                 ...data
//             }
//         }

//         return each;
//     })

//     res.status(200).json({
//         success:true,
//         data:users,
//         message:"User updated successfully"
//     })
    
// });

routers.put('/users/:id', updateUserById);





// delete user
// routers.delete('/users/:id',(req,res)=>{

//     const {id} = req.params;

//     const user = users.find((each)=>each.id === id)
//     if(!user){
//         return res.status(404).json({
//             success: false,
//             message: `user not found ${id}`
//         })
//     }

//     users = users.filter((each)=>each.id !== id)

//     res.status(200).json({
//         success:true,
//         data:users,
//         message:"User deleted successfully"
//     })

// });

routers.delete('/users/:id', deleteUserById);



// get subscription details
// routers.get("/users/subscription-details/:id", (req, res)=>{

//     const {id} = req.params;

//     const user = users.find((each)=>each.id === id);
//     if(!user){
//         return res.status(404).json({
//             success:false,
//             message:`user not found for id:${id}`
//         })
//     }

//     // extract the subs details
//     const getDateInDays = (data ='')=>{

//         let date;
//         if(data){
//             date = new Date(data);
//         }else{
//             date = new Date();
//         }
//         let days = Math.floor(date/(1000*60*60*24));
//         return days;
//     }

//     const subscriptionType = (date) =>{
//         if(users.subscriptionType === "Basic"){
//             date = date +90
//         }else if(users.subscriptionType === "Standard"){
//             date = date +180
//         }else if(users.subscriptionType === "Premium"){
//             date = date +365
//         }

//         return date;
//     }

//     // subs expiration calsulation
//     let returnDate = getDateInDays(user.returnDate);
//     let currentDate = getDateInDays();
//     let subscriptionDate = getDateInDays(user.subscriptionDate);
//     let subscriptionExpiration = subscriptionType(subscriptionDate);
    

//     const data ={
//         ...user,
//         subscriptionExpired: subscriptionExpiration < currentDate,
//         subscriptionDaysLeft: subscriptionExpiration - currentDate,
//         daysLeftForExpiration: returnDate - currentDate,
//         returnDate: returnDate < currentDate ? "Book is overdue" : returnDate,
//         fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0
//     }

//     res.status(200).json({
//         success:true,
//         data:data
//     });

// });

routers.get("/users/subscription-details/:id", getSubscriptionDetails);

exports = module.exports = routers;
