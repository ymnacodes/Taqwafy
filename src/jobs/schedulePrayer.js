const { getDailyPrayer }= require('../helpers/dailyPrayer');
const {scheduleTask} = require('../helpers/scheduler');
const { getAllUsers } = require('../helpers/setUpAthan/database');
const { sendPrayerReminder } = require('../helpers/sendReminder');

async function scheduleDailyPrayer(){
   try {
     const users = await getAllUsers();
 
     for (const user of users){
         const {lat, lng} = user;
         const timings = await getDailyPrayer(lat,lng);
         
         for( const [prayerName, prayerTime] of Object.entries(timings)){
             scheduleTask(prayerTime, async()=>
             {
                 await sendPrayerReminder(user,prayerName,prayerTime);
             })
         }
     }
   } catch (error) {
    console.log("Ya Allah why not schedule? : ", error);
   }
}

module.exports = {scheduleDailyPrayer};