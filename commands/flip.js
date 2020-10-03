const Discord = require('discord.js');

module.exports = {
    name: "flip",
    description: "flip a coin",
    aliases: ["coin"],

    async run (client, message, args){
        var choices = [
            "ulo",
            "buntot"
        ];

        var output = choices[Math.floor(Math.random() * choices.length)];

        message.channel.send(`Yoooown! **${output}!**`);
    }
}