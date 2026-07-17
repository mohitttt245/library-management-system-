 const {UserModel, BookModel} = require("../models/index");
 
 exports.getAllUsers = async(req,res)=>{
    const users = await UserModel.find();

    if(!users.length===0){
        return res.status(404).json({
            success: false,
            message: "No users found"
        });
    }
    res.status(200).json({
        success: true,
        data: users
    });
 }; 


 exports.getUserById = async(req,res)=>{
    const {id} = req.params;
    // const user = await UserModel.findById(id);
    // const user = await UserModel.findById({ _id: id });
    const user = await UserModel.findByone({ _id: id });

    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found with id: ${id}`
        });
    }

    res.status(200).json({
        success: true,
        data: user
    });
};


exports.addNewUser = async(req,res)=>{
    const {data} = req.body;

    // if(!data || Object.keys(data).length === 0){
    if(!data){
        return res.status(400).json({
            success:false,
            message:"Please provide all the required fields"
        });
    }

    await UserModel.create(data);

    res.status(201).json({
        success:true,
        message:"User created successfully"
    })
}


exports.updateUserById = async(req,res)=>{
    const {id} = req.params;
    const data = req.body;

    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "Please provide user data"
        });
    }

    const user = await UserModel.findById(id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found with id: ${id}`
        });
    }

    // Object.assign(user, data);
    // await user.save();

    const updatedUser = await UserModel.findOneAndUpdate({_id: id}, data, {new: true});

    res.status(200).json({
        success: true,
        data: updatedUser,
        message: "User updated successfully"
    });
}


exports.deleteUserById = async(req,res)=>{
    const {id} = req.params;
    const user = await UserModel.findById(id);

    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found with id: ${id}`
        });
    }

    await UserModel.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    });
}


exports.getSubscriptionDetails = async(req,res)=>{
    const {id} = req.params;
    const user = await UserModel.findById(id);

    if(!user){
        return res.status(404).json({
            success: false,
            message: `User not found with id: ${id}`
        });
    }

    const getDateInDays = (data)=>{
        if(data){
            let date = new Date(data);
            let days = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));
            return days;
        }
    }

    const subscriptionType =(date)=>{
        if(user.subscriptionType === "Basic"){
            date = date + 90;
        }else if(user.subscriptionType === "Standard"){
            date = date + 180;
        }else if(user.subscriptionType === "Premium"){
            date = date + 365;
        }
        return date;
    }

    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        ...user._doc,
        subscriptionExpired: subscriptionExpiration < currentDate,
        subscriptionDaysLeft: subscriptionExpiration - currentDate,
        daysLeftForExpiration: returnDate - currentDate,
        returnDate: returnDate < currentDate ? "Book is overdue" : returnDate,
        fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0
    }

    res.status(200).json({
        success: true,
        data: data
    });
}
