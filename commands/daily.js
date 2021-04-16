const ms = require("parse-ms");


module.exports = {
    name: "daily",
    description: "collect daily credits",
    execute(client, message, args, Discord, profileData){
       let timeout = 86400000;
       let reward = 100;

       let embed = new Discord.MessageEmbed();
       embed.setTitle("Daily Katiwala Coins");

            if(timeout - (Date.now() - profileData.daily) > 0){
                let time = ms(timeout - (Date.now() - profileData.daily));

                embed.setColor("#ff0000");
                embed.setDescription(`**${message.member.displayName}, you've already collected your daily KCoins for today.**`);
                embed.addField(`Time until next collection:`, `${time.hours}h, ${time.minutes}m, ${time.seconds}s`);
                return message.channel.send(embed);
            } else {
                profileData.kcoins += reward;
                profileData.daily = Date.now();
                profileData.save().catch(err => console.log(err));

                embed.setDescription(`You got ${reward} KCoins! Come back tomorrow to get your daily KCoins!\nCurrent balance: **${profileData.kcoins} KCoins**`);
                embed.setColor("#00ff00");
                return message.channel.send(embed);
            }
        
    }

}