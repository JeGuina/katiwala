const ps = require("../models/Economy");
const Discord = require("discord.js");

module.exports = {
    name: "inventory",
    description: "display current user credits",
    aliases: ["inv"],
    execute: async function(client, message, args){

        let comchan = '755992684572966965';
        let testchan = '757423283367968942';

        if(message.channel.id == comchan || message.channel.id == testchan){

                let userEconomy = await ps.findOne({userID: message.author.id});
                if(!userEconomy) userEconomy = new ps({
                        userID: message.author.id,
                        username: message.author.tag,
                        serverID: message.guild.id,
                        kcoins: 1000,
                        ktokens: 0,
                        lastDaily: 0,
                        dailycount: 0,
                        diamonds: 0,
                        steals: 0, 
                        blocks: 0,
                        trophies: 0
                    });

                let embed = new Discord.MessageEmbed()
                .setAuthor(`${message.member.displayName}'s Inventory`, message.author.avatarURL())
                .addField("💰 KCoins", `${userEconomy.kcoins}`)
                .addField("💸 KTokens", `${userEconomy.ktokens}`)
                .addField("⚔️ Steals", `${userEconomy.steals}`)
                .addField("🛡️ Blocks", `${userEconomy.blocks}`)
                .addField("💎 Diamonds", `${userEconomy.diamonds}`)
                .addField("🏆 Trophies", `${userEconomy.trophies}`)
                .setColor("#00ff00")
                message.channel.send(embed);
        } else {
                message.channel.bulkDelete(1, true);
                message.channel.send("Please issue this command on `<@755992684572966965>` channel")
            .then(msg => {
                msg.delete({timeout: 5000})
            });
            }


}
}