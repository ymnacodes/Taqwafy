const mongoose = require('mongoose');

module.exports= function(mongoURI){
    mongoose.connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log("Error with connecting to the database! Call Yomna!");
        console.error(error);
    });
}