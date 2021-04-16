const Discord = require('discord.js');

module.exports = {
    name: "break",
    description: "take a break",
    aliases: ["break", "sto", "muteme", "crateme"],
    execute(client, message, args) {
        let sec = parseInt(args[0]);
        let mins = sec * 60000;
        let datenow = Date.now() + sec * 60000;
        const member = message.member;

        let embed = new Discord.MessageEmbed();

        if (!sec || isNaN(sec) || sec > 10080 || sec <= 0) return message.channel.send("Time entered must be between 0 and 10080 minutes (one week)");
        if (message.member.roles.cache.has("761970505111568414")) return message.channel.send("Staff can't mute themselves. You have to endure the unending pain of this server.");

        message.channel.send(embed.setDescription(`Would you like to take a break for ${sec} minutes? You won't be able to talk until this ends. (yes / no)`).setFooter(new Date (datenow)));
        message.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time1: 30000})
        .then(collected => {
            if(collected.first().content.toLowerCase() == 'yes'){

                member.roles.add("761971591104954379");
                member.roles.remove("755990730186555442");

                message.channel.send(embed.setDescription("You muted yourself for " + sec + " minutes. If you want the timeout to end early... figure it out..."));

                setTimeout(function(){
                    member.roles.add("755990730186555442");
                    member.roles.remove("761971591104954379");
                    message.author.send(embed.setDescription(`You had been unmuted in **TRUST ISSUES PH.** Welcome back!`));
                }, mins);
            } else {
                return message.channel.send(`Ok, you saved yourself from ${sec} minutes of pain.`);
            }
        }).catch((err) => console.log(err));
        
    }
};