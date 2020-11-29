const Discord = require("discord.js");
const ms = require("parse-ms");
const mongoose = require("mongoose");

//DB Connect
mongoose.connect(process.env.MONGOPASS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//mode;s
const Data = require("../models/data.js");


module.exports = {
    name: "daily",
    description: "collect daily credits",

    async run (client, message, args){
       let timeout = 86400000;
       let reward = 100;

       let embed = new Discord.MessageEmbed();
       embed.setTitle("Daily Katiwala Coins");

       Data.findOne({
        userID: message.author.id
    }, (err,data) => {
        if(err) console.log(err);
        if(!data){
            const newData = new Data({
                name: message.author.username,
                userID: message.author.id,
                lb: "all",
                money: reward,
                daily: Date.now(),
            })
            newData.save().catch(err => console.log(err));
            let embed = new Discord.MessageEmbed()
            .setDescription(`${message.member.displayName}'s KCoins: **${reward}**`)
            .setColor("#00ff00")
            message.channel.send(embed);
        } else {
            if(timeout - (Date.now() - data.daily) > 0){
                let time = ms(timeout - (Date.now() - data.daily));

                embed.setColor("#ff0000");
                embed.setDescription(`**${message.member.displayName}, you've already collected your daily KCoins for today.**`);
                embed.addField(`Time until next collection:`, `${time.hours}h, ${time.minutes}m, ${time.seconds}s`);
                return message.channel.send(embed);
            } else {
                data.money += reward;
                data.daily = Date.now();
                data.save().catch(err => console.log(err));

                embed.setDescription(`You got ${reward} KCoins! Come back tomorrow to get your daily KCoins!\nCurrent balance: **${data.money} KCoins**`);
                embed.setColor("#00ff00");
                return message.channel.send(embed);
            }
        }
    })
    }

}