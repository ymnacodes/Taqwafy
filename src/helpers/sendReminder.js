const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');

async function sendPrayerReminderToAllChannels(guildId,prayerName){
    try{
        const guild = await client.guilds.fetch(guildId);
        const defaultChannel = guild.channels.cache.find(channel.isTextBased() &&
        channel.permissionsFor(guild.me).has('SEND_MESSAGES'));

        if (defaultChannel){
            const message= `📢 **It's time for ${prayerName} prayer!** 🕌 Please take a moment to pray.`;
            await defaultChannel.send(message);
        }

        const activeVoiceChannels = guild.channels.cache.filter(channel=>channel.isVoiceBased() &&
        channel.members.some(member=>!member.user.bot));

        for(const [channelId, voiceChannel] of activeVoiceChannels){
            try {
                const connection= joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: guildId,
                    adapterCreator: voiceChannel.guild.voiceAdapterCreator
                });

                const player= createAudioPlayer();
                const resource= createAudioResource(`./audio/Athan.mp3`);
                connection.subscribe(player);
                player.play(resource);

                for(const [memberId, member] of voiceChannel.members){
                        await member.voice.setMute(true);
                }

                player.on(AudioPlayerStatus.idle, async()=> {
                    for(const [memberId, member] of voiceChannel.members){
                        await member.voice.setMute(false);
                    }
                    connection.destroy();
                }
                );
            } catch (err) {
                console.error(`Error joining or playing in channel ${voiceChannel.id}:`, err);
            }
        }


    }
    catch (err) {
        console.error('Error sending prayer reminder to all channels:', err);
    }
}

module.exports = { sendPrayerReminderToAllChannels };