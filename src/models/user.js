const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userID:{
        type: String,
        required: true,
        unique: true
    },
    location:{
        city: String,
        country: String,
        latitude: Number,
        longitude: Number
    },
    wantsAutomaticReminder:{
        type: Boolean,
        default: false
    },
    agreedToTerms:{
        type: Boolean,
        default: false
    },
    consentDate:{
        type: Date,
        default: Date.now
    }
});

module.exports= mongoose.model('User', userSchema);