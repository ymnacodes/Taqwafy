const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const { getPrayerTimes } = require('../helpers/prayertimes');
const { getClosestPrayer } = require('../helpers/prayertimes');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('prayertime')
        .setDescription("Get prayer times based on city and country!")
        .addStringOption(option =>
            option.setName('city')
                .setDescription('The city to get prayer times for')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('country')
                .setDescription('The country to get prayer times for')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('type')
                .setDescription('The type of prayer time you want (A specific prayer in your day, Next prayer, or daily prayers)')
                .setRequired(true)
                .addChoices(
                    { name: 'Specific Prayer Time', value: 'specific' },
                    { name: 'Next Prayer', value: 'next' },
                    { name: 'All Prayer Times for the Day', value: 'daily' }
                ))
        .addStringOption(option =>
            option.setName('prayer')
                .setDescription('Choose the prayer (only required for specific prayer time)')
                .setRequired(false)
                .addChoices(
                    { name: 'Fajr', value: 'Fajr' },
                    { name: 'Dhuhr', value: 'Dhuhr' },
                    { name: 'Asr', value: 'Asr' },
                    { name: 'Maghrib', value: 'Maghrib' },
                    { name: 'Isha', value: 'Isha' },
                )
        ),

    async execute(interaction) {
        try {
            const city = interaction.options.getString('city');
            const country = interaction.options.getString('country');
            const type = interaction.options.getString('type');  // Get the 'type' option
            const prayer = interaction.options.getString('prayer');
            // Fetch prayer times
            const prayerTimes = await getPrayerTimes(city, country);
            const validPrayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
            let responseMessage = '';
            // Handle based on the 'type' provided by the user
            if (type === 'specific') {
                if (prayer && prayerTimes[prayer]) {
                    responseMessage = `The ${prayer} prayer is at ${prayerTimes[prayer]}.`;
                }
            } else if (type === 'next') {
                // Get the next prayer
                const { prayer, timing } = await getClosestPrayer(prayerTimes);
                responseMessage = `The next prayer is ${prayer} at ${timing}.`;
            } else if (type === 'daily') {
                // List all prayers for the day
                responseMessage = `Today's prayer times in ${city} , ${country} are:\n`;
                for (const [prayer, time] of Object.entries(prayerTimes)) {
                    if (validPrayers.includes(prayer))
                    responseMessage += `${prayer}: ${time}\n`;
                }
            }

            // Send the response
            await interaction.reply({
                content: responseMessage,
                ephemeral: false
            });
        } catch (error) {
            await interaction.reply({
                content: 'Apologies, there was an error fetching the prayer times. Please contact global world star yomna <3.',
                ephemeral: true
            });
        }
    }
};
