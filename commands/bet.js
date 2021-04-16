const profileModel = require("../models/profileSchema");

module.exports = {
    name: "bet",
    description: "do some bet",
    aliases: ["gamble"],
    execute(client, message, args, Discord, profileData){

                var maxBet = 10000;

                let embed = new Discord.MessageEmbed();

                if(profileData.kcoins <= 0) return message.reply("you don't have any KCoins.");

                if(!args[0]) return message.reply("please specify a bet amount.");

                if(args[0].toLowerCase() == "all") args[0] = profileData.kcoins;

                try {
                    var bet = parseFloat(args[0]);
                } catch {
                    return message.reply("you can only enter whole numbers.");
                }

                if(bet != Math.floor(bet)) return message.reply("you can only enter whole numbers.");

                if(profileData.kcoins < bet) return message.reply("you don't have enough KCoins.");

                if(bet > maxBet) return message.reply(`the maximum bet is ${maxBet.toLocaleString()} KCoins`);

                let chances = ["win", "lose"];
                var pick = chances[Math.floor(Math.random() * chances.length)];

                if(pick == "lose") {
                    profileData.kcoins -= bet;
                    profileData.save();
                    embed.setTitle("You lost! 😔");
                    embed.setDescription(`Tough luck <@${message.author.id}>.\nNew balance: **${profileData.kcoins} KCoins**`)
                    embed.setColor("#ff0000");
                    return message.channel.send(embed);
                } else {
                    profileData.kcoins += bet;
                    profileData.save();
                        embed.setTitle("You won! 🎊")
                        embed.setDescription(`Nice one, <@${message.author.id}>!\nNew balance: **${profileData.kcoins} KCoins**`);
                        embed.setColor("#00ff00");
                        return message.channel.send(embed);
                }

    }
}