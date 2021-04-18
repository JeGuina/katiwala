const ps = require("../models/Economy");
const Discord = require("discord.js");


module.exports = {
    name: "bet",
    description: "do some bet",
    aliases: ["gamble"],
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

                var maxBet = 10000;

                let embed = new Discord.MessageEmbed();

                if(userEconomy.kcoins <= 0) return message.reply("you don't have any KCoins.");

                if(!args[0]) return message.reply("please specify a bet amount.");

                if(args[0].toLowerCase() == "all") args[0] = userEconomy.kcoins;

                try {
                    var bet = parseFloat(args[0]);
                } catch {
                    return message.reply("you can only enter whole numbers.");
                }

                if(bet != Math.floor(bet)) return message.reply("you can only enter whole numbers.");

                if(userEconomy.kcoins < bet) return message.reply("you don't have enough KCoins.");

                if(bet > maxBet) return message.reply(`the maximum bet is ${maxBet.toLocaleString()} KCoins`);

                let chances = ["win", "lose"];
                var pick = chances[Math.floor(Math.random() * chances.length)];

                if(pick == "lose") {
                    userEconomy.kcoins -= bet;
                    userEconomy.save();
                    embed.setTitle("You lost! 😔");
                    embed.setDescription(`Tough luck <@${message.author.id}>.\nNew balance: **${userEconomy.kcoins} KCoins**`)
                    embed.setColor("#ff0000");
                    return message.channel.send(embed);
                } else {
                    userEconomy.kcoins += bet;
                    userEconomy.save();
                        embed.setTitle("You won! 🎊")
                        embed.setDescription(`Nice one, <@${message.author.id}>!\nNew balance: **${userEconomy.kcoins} KCoins**`);
                        embed.setColor("#00ff00");
                        return message.channel.send(embed);
                }
            } else {
                message.channel.bulkDelete(1, true);
                message.channel.send("Please issue this command on `<@755992684572966965>` channel")
            .then(msg => {
                msg.delete({timeout: 5000})
            });
            }

    }
}