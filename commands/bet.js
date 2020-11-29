const Discord = require('discord.js');
const mongoose = require("mongoose");

//DB Connect
mongoose.connect(process.env.MONGOPASS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//models
const Data = require("../models/data.js");

module.exports = {
    name: "bet",
    description: "do some bet",
    aliases: ["gamble"],

    async run (client, message, args){


        Data.findOne({
            userID: message.author.id
        }, (err,data) => {
            if(err) console.log(err);
            if(!data){
                const newData = new Data({
                    name: message.author.username,
                    userID: message.author.id,
                    lb: "all",
                    money: 0,
                    daily: 0,
                })
                newData.save().catch(err => console.log(err));
                return message.reply("you don't have any KCoins.");
            } else {
                var maxBet = 10000;

                let embed = new Discord.MessageEmbed();

                if(data.money <= 0) return message.reply("you don't have any KCoins.");

                if(!args[0]) return message.reply("please specify a bet amount.");

                if(args[0].toLowerCase() == "all") args[0] = data.money;

                try {
                    var bet = parseFloat(args[0]);
                } catch {
                    return message.reply("you can only enter whole numbers.");
                }

                if(bet != Math.floor(bet)) return message.reply("you can only enter whole numbers.");

                if(data.money < bet) return message.reply("you don't have enough KCoins.");

                if(bet > maxBet) return message.reply(`the maximum bet is ${maxBet.toLocaleString()} KCoins`);

                let chances = ["win", "lose"];
                var pick = chances[Math.floor(Math.random() * chances.length)];

                if(pick == "lose") {
                    data.money -= bet;
                    data.save().catch(err => console.log(err));
                    embed.setTitle("You lost! 😔");
                    embed.setDescription(`Tough luck <@${message.author.id}>.\nNew balance: **${data.money} KCoins**`)
                    embed.setColor("#ff0000");
                    return message.channel.send(embed);
                } else {
                    data.money += bet;
                    data.save().catch(err => console.log(err));
                        embed.setTitle("You won! 🎊")
                        embed.setDescription(`Nice one, <@${message.author.id}>!\nNew balance: **${data.money} KCoins**`);
                        embed.setColor("#00ff00");
                        return message.channel.send(embed);
                }
            }
        })

    }



}