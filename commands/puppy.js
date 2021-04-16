const randomPuppy = require('random-puppy');
const Discord = require('discord.js');

module.exports = {
    name: "puppy",
    description: "gives you a random puppy",
    
    execute(client, message, args){
        const subReddits = ["puppies"]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]

        const img = randomPuppy(random);

        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setImage(img)

        message.channel.send(embed);
    }
}