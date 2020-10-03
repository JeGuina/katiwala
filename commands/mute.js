const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
    name: "mute",
    description: "mutes a member temporarily",
    aliases: ["crate", "tempmute"],

    async run (client, message, args){
        let messageArray = message.content.split(' ');
        let arg = messageArray.slice(1);
        let cmd = messageArray[0];

        if(message.member.hasPermission('MANAGE_MESSAGES')){
            var member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if(!args[0]) return message.channel.send(`Please enter a user to mute`);

            let mainrole = message.guild.roles.cache.find(role => role.name === "Crewmates");
            let role = message.guild.roles.cache.find(role => role.name === "timeout");

            if(!role) return message.channel.send(`Could not find the 'timeout' role`);

            let time = args[1];
            if(!time) return message.channel.send(`Please specify a time`);

            member.roles.remove(mainrole.id);
            member.roles.add(role.id);

            message.channel.send(`**📦 GET IN YOUR CRATE ${member.user.tag} for ${ms(ms(time))}!!!**`);

            setTimeout(function(){
                member.roles.add(mainrole.id);
                member.roles.remove(role.id);
                message.author.send(`You have now been unmuted.`)
            }, ms(time));
        } else {
            return message.channel.send(`You cannot use that command!`);
        }
    }
}