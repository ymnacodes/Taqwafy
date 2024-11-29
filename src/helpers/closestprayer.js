const axios = require('axios');

exports.getClosestPrayer= async (prayerTimes) => {
    const relevantPrayers = {
        Fajr: prayerTimes.Fajr,
        Dhuhr: prayerTimes.Dhuhr,
        Asr: prayerTimes.Asr,
        Maghrib: prayerTimes.Maghrib,
        Isha: prayerTimes.Isha
    };

    const now = new Date();
    const currentTime = now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
    });

    let nextPrayer = null;
    let nextPrayerTime = null;

    for (const [prayer, time] of Object.entries(relevantPrayers)) {
        if (time > currentTime) {
            nextPrayer = prayer;
            nextPrayerTime = time;
            break;
        }
    }

    // if no next prayer found, return the first prayer of the next day
    if (!nextPrayer) {
        nextPrayer = 'Fajr';
        nextPrayerTime = relevantPrayers.Fajr;
    }

    return { prayer: nextPrayer, timing: nextPrayerTime };
}
