const axios = require('axios');

exports.getPrayerTimes = async (country, city) => {
    try {
        const response = await axios.get(`https://api.aladhan.com/v1/timingsByCity`, {
            params: {
                city: city,
                country: country,
                method: 2  
            }
        });
        const timing = response.data.data.timings;
        console.log(timing);
        return timing;
    } catch (error) {
        console.error("Error fetching prayer times:", error);
        return null;
    }
}

