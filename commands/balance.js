require('dotenv').config();
const Discord = require("discord.js");
const mongoose = require("mongoose");

//DB Connect
mongoose.connect(process.env.MONGOPASS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//mode;s
const Data = require("../models/data.js");

module.exports = {
    name: "balance",
    description: "display current user credits",
    aliases: ["bal", "credits", "kcoins"],

    async run (client, message, args){
        if(!args[0]){
            var user = message.author;
        }
        else {
            var user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        }

        Data.findOne({
            userID: user.id
        }, (err,data) => {
            if(err) console.log(err);
            if(!data){
                const newData = new Data({
                    name: client.users.cache.get(user.id).username,
                    userID: user.id,
                    lb: "all",
                    money: 0,
                    daily: 0,
                })
                newData.save().catch(err => console.log(err));
                let embed = new Discord.MessageEmbed()
                .setDescription(`${message.member.displayName}'s KCoins: **0**`)
                .setColor("#00ff00")
                message.channel.send(embed);
            } else {
                let embed = new Discord.MessageEmbed()
                .setDescription(`${message.member.displayName}'s KCoins: **${data.money}**`)
                .setColor("#00ff00")
                message.channel.send(embed);
            }
        })

    }
}