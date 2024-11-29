const axios = require('axios');

async function getDailyPrayer(lat, lng) {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const apiUrl = `https://api.aladhan.com/v1/timings/${formattedDate}?latitude=${lat}&longitude=${lng}&method=2`;

    const response = await axios.get(apiUrl);
    return response.data.data.timings;
}

module.exports = { getDailyPrayer };
