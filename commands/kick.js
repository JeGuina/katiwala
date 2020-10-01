const Discord = require('discord.js');

module.exports = {
    name: "kick",
    description: "Kicks a member from server",

    async run (client, message, args){
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You cannot use that command!");

        if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("I do not have the right permission");

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send("Please specify a user");

        if(!member) return message.channel.send("User cannot be found. Sorry about that. :/");

        if(!member.kickable) return message.channel.send("User cannot be kicked. Are you trying to kick an admin/mod? LOL");

        if(member.id === message.author.id) return message.channel.send("You can't kick your self LOL");

        let reason = args.slice(1).join(" ");

        if(reason == undefined) reason = 'Unspecified';

        member.kick(reason).catch(err => {
            if(err) return message.channel.send("Something went wrong. :/");

        })

        const kickEmbed = new Discord.MessageEmbed()
        .setTitle("Member Kicked")
        .setThumbnail(member.user.displayAvatarURL())
        .addField('User kicked', member)
        .addField('Kicked by', message.author)
        .addField('Reason', reason)
        .setFooter('Time kicked', client.user.displayAvatarURL())
        .setTimestamp()

        message.channel.send(kickEmbed);
    }
}