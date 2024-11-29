const cron = require('node-cron');

function scheduleTask(time, task) {
    const [hour, minute] = time.split(':');
    const cronTime = `${minute} ${hour} * * *`; // Minute Hour Daily

    return cron.schedule(cronTime, task);
}

module.exports = { scheduleTask };
