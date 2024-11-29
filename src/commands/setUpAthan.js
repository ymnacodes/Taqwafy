const { SlashCommandBuilder } = require('discord.js');
const { addUser, isGuildId } = require('../helpers/setUpAthan/database.js');
const { getlocation } = require('../helpers/getlocation.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setupathan')
        .setDescription("Set up or update your prayer reminder so you won't miss salah!")
        .addStringOption(option =>
            option.setName('city')
                .setDescription('The city you are in')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('country')
                .setDescription('The country you are in')
                .setRequired(true))
        .addBooleanOption(option =>
            option.setName('agree')
                .setDescription('Do you agree to set up the automatic prayer reminder?')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('setup_type')
                .setDescription('Choose whether this is a new setup or an update to an existing one')
                .setRequired(true)
                .addChoices(
                    { name: 'New Setup', value: 'new' },
                    { name: 'Update Setup', value: 'update' }
                )),

    async execute(interaction) {
        try {
            const city = interaction.options.getString('city');
            const country = interaction.options.getString('country');
            const agree = interaction.options.getBoolean('agree');
            const setupType = interaction.options.getString('setup_type'); // Get the setup type
            const guildId = interaction.guild.id; // Get the guildId from interaction

            if (agree) {

                const guildExists = await isGuildId(guildId);

                if (setupType === 'new') {
                    
                    if (!guildExists) {
                        const { lat, lng } = await getlocation(city, country);
                        
                        await addUser(interaction.user.id, guildId, lng, lat, true, new Date());

                        await interaction.reply({ content: 'Alhamdulillah, you have been successfully added to the automatic prayer reminder list!', ephemeral: true });
                    } else {

                        await interaction.reply({ content: 'This guild already has a location set. You can update the location if needed.', ephemeral: true });
                    }
                } else if (setupType === 'update') {
                    // If the user wants to update, check if the guild location exists
                    if (guildExists) {
                        const { lat, lng } = await getlocation(city, country);
                        // Update the user's location in the guild
                        await addUser(interaction.user.id, guildId, lng, lat, true, new Date());
                        await interaction.reply({ content: 'Your prayer reminder location has been successfully updated!', ephemeral: true });
                    } else {

                        await interaction.reply({ content: 'No prayer reminder setup found for this guild. Please set up a new one first.', ephemeral: true });
                    }
                }
            }
        } catch (err) {
            console.log(err);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
};
