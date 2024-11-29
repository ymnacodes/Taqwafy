// const User= require('../../models/user.js');

const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, 'userData.json');

function loadUserData(){
    if (!fs.existsSync(path.join(__dirname, 'userData.json'))){
        fs.writeFileSync(path.join(__dirname, 'userData.json'), JSON.stringify({}));
    }
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return data ? JSON.parse(data) : {};  // Safely parse data or return empty object
    } catch (error) {
        console.error("Error reading or parsing userData.json:", error);
        return {};  // Return an empty object if there is an error
    }
}

function saveUserData(data){
    fs.writeFileSync(path.join(__dirname, 'userData.json'), JSON.stringify(data));
}

async function isGuildId(guildId){
    try {
       for (const user of Object.values(loadUserData())){
           if (user.guildId === guildId){
               return true;
           }
       }
       return false;
    } catch (error) {
        console.log("Error while checking guildId: ", error);
    }
}




async  function addUser(userID,guildId,lng,lat,agreedToTerms,consentDate){
    try {
        const userData = loadUserData();
        userData[userID] = {
            guildId,
            lng,
            lat,
            agreedToTerms,
            consentDate
        }

        fs.writeFileSync(dataFilePath, JSON.stringify(userData, null, 2));
        return 0;
        console.log("Alhamdulillah, user added successfully!");
    } catch (error) {
        console.log("Allah Akbar, Error while adding user: ", error);
        return 1;
    }
}

async function getAllUsers(){
    try {
        const userData = loadUserData();
        return Object.values(userData);
    } catch (error) {
        console.log("Error while getting all users: ", error);
    }
}

module.exports = {isGuildId, addUser, getAllUsers};





