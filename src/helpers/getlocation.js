require('dotenv').config();
const axios = require('axios');
const addUser = require('./setUpAthan/database.js');


exports.getlocation = async (country, city) => {
    try {
        const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${city},${country}&key=${process.env.OPENCAGE_API_KEY}`);
                const {lat, lng} = response.data.results[0].geometry;
                return {lat, lng};
                console.log("user lat = ${lat} and user long = ${lng}");
    } catch (error) {
        console.log("Error Adding User!", error);
    }
}