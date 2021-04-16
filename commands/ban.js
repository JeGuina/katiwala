const Discord = require('discord.js');

module.exports = {
    name: "ban",
    description: "Kicks a member from server",

    execute(client, message, args){
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You cannot use that command!");

        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I do not have the right permission");

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send("Please specify a user");

        if(!member) return message.channel.send("User cannot be found. Sorry about that. :/");

        if(!member.kickable) return message.channel.send("User cannot be banned. Are you trying to kick an admin/mod? LOL");

        if(member.id === message.author.id) return message.channel.send("You can't ban your self LOL");

        let reason = args.slice(1).join(" ");

        if(reason == undefined) reason = 'Unspecified';

        member.kick(reason).catch(err => {
            if(err) return message.channel.send("Something went wrong. :/");

        })

        const banEmbed = new Discord.MessageEmbed()
        .setTitle("Member banned")
        .setThumbnail(member.user.displayAvatarURL())
        .addField('User banned', member)
        .addField('Banned by', message.author)
        .addField('Reason', reason)
        .setFooter('Time banned', client.user.displayAvatarURL())
        .setTimestamp()

        message.channel.send(banEmbed);
    }
}