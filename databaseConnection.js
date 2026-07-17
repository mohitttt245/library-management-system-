const mongoose = require('mongoose');

function DbConnection() {
    const DB_URL = process.env.MONGO_DRI

    mongoose.connect(DB_URL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    })

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "Connection Eroor"))
    db.once("open", function(){
        console.log("DB Connected...")
    })
}

module.exports = DbConnection;




// const mongoose = require("mongoose");

// async function DbConnection() {
//     try {
//         console.log("Connecting to:", process.env.MONGO_DRI);

//         await mongoose.connect(process.env.MONGO_DRI);

//         console.log("✅ MongoDB Connected");
//     } catch (err) {
//         console.error("❌ Connection Error");
//         console.error(err);
//     }
// }

// module.exports = DbConnection;