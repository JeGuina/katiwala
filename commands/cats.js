const randomPuppy = require('random-puppy');
const Discord = require('discord.js');

module.exports = {
    name: "meow",
    description: "gives you a random cat pic",
    aliases: ["cat"],
    
    execute(client, message, args){
        const subReddits = ["cats"]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]

        const img = randomPuppy(random);

        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(img)

        message.channel.send(embed);
    }
}