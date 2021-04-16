const Discord = require('discord.js');

module.exports = {
    name: "8ball",
    description: "FORTUNE!!!",
    aliases: ["kball", "8b"],
    category: "fun",
    usage: "<question>",
    execute(client, message, args){
        const question = args.join(" ");
        if(!question){
            return message.channel.send("Walang tanong sa sagot, bruh.");
        } else {
            let responses = [
                "Aba, wag mo tanong sa akin. Sino ka ba?",
                "Tinatanong pa ba yan? Edi yes.",
                "Tinatanong pa ba yan? Edi no.",
                "Pag-iisipan ko muna.",
                "Wag mong subukan. Masisira ang buhay mo.",
                "Tingin ko oo",
                "Baka hindi.",
                "Aba malay ko sayo",
                "Ewan",
                "Subukan mo ulit magtanong",
                "Ha? HAKDOG!",
                "Pffff",
                "Baka...pero hindi cow.",
                "Anong tingin mo sagot?",
                "HAHAHAHAHAHAHA No.",
                "Oh gosh nooooooooooo",
                "OO NGA ANG KULIT MO!",
                "HINDI NGA ANG KULIT MO!",
                "Pwede.",
                "Yes but actually no.",
                "No but actually yes.",
                "AHAHAHAHAHAHA YESSSSS!!"
            ]

            let Response = responses[Math.floor(Math.random()*(responses.length)-1)]
            let Embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(Response)

            message.channel.send(Embed);
        }
    }

}