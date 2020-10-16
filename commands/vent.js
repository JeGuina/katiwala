const Discord = require('discord.js');

module.exports = {
    name: "vent",
    description: "send venting messages",
    aliases: ["rant", "v"],

    async run (client, message, args){
        const sayMessage = args.join(' ');
        const channel = message.channel.id == '765833025216053249';
        const ventch = message.guild.channels.cache.find(vent => vent.name === "venting-machine");
        let datenow = Date.now();
        message.delete().catch(err => console.log(err));

        if(!channel){
            message.channel.send(`**You are not allowed to do that command here!**`)
            .then(msg => {
                msg.delete({timeout: 2000});
            })   
        }
        else{
            var randomNumber = Math.floor(Math.random() * 10000);
            const embed = new Discord.MessageEmbed()
            .setTitle("Anon #" +randomNumber)
            .addField("Message", sayMessage)
            .setFooter(new Date (datenow))
            
            ventch.send(embed);
        }
       

        
    }
}