const ps = require("../models/Economy");
const Discord = require("discord.js");


module.exports = {
    name: "trophyboard",
    description: "do some bet",
    aliases: ["top"],
    execute: async function(client, message, args){

        let comchan = '755992684572966965';
        let testchan = '757423283367968942';
        let embed = new Discord.MessageEmbed();

        if(message.channel.id == comchan || message.channel.id == testchan){
            let page = (!isNaN(args[1]) && args[1] > 0) ? args[1] : 1;
            let userEconomies = await ps.find({}).sort({trophies: -1, diamonds: -1});
            embed.setTitle("Trophy Leaderboard");
            let i = 1 + 10 * (page - 1);
            for (let econ of userEconomies) {
            if (message.guild.members.cache.get(econ.userID)) {
                embed.addField(i + ". " + message.guild.members.cache.get(econ.userID).displayName, "🏆 x" + econ.trophies + "  💎x" + econ.diamonds);
            } else embed.addField(i + ". Invalid User", "🏆 x0  💎x0");
            i++;
        }
        embed.setFooter("🏆 = Trophies || 💎 = Diamonds || Earn 10 Diamonds to get a trophy");
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