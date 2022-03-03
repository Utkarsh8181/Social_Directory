const mongoose = require('mongoose')

const DB = process.env.URL;
mongoose.connect(DB)
.then(() => {
    console.log('Connection is Successfull');
})
.catch((error) => {
    console.log("Error in Connection");
})
