const mongoose = require('mongoose');

const Connect = async (URL)=>{
    await mongoose.connect(URL);
    console.log("Connected");
}

module.exports = Connect;