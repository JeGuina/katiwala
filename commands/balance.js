module.exports = {
    name: "balance",
    description: "display current user credits",
    aliases: ["bal", "credits", "kcoins"],
    execute(client, message, args, Discord, profileData){

                let embed = new Discord.MessageEmbed()
                .setAuthor(`${message.member.displayName}'s Balance`, message.author.avatarURL())
                .setDescription(`KCoins: **${profileData.kcoins}**`)
                .setColor("#00ff00")
                message.channel.send(embed);


        }
}