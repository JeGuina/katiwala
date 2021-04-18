const ds = require("../models/counters");
const ps = require("../models/Economy");
const Discord = require("discord.js");

module.exports = {
    name: "daily",
    description: "collect daily credits",
    execute: async function (client, message, args){

        let comchan = '755992684572966965';
        let testchan = '757423283367968942';
        let embed = new Discord.MessageEmbed();

        if(message.channel.id == comchan || message.channel.id == testchan){

            let userEconomy = await ps.findOne({userID: message.author.id});
            if(!userEconomy) userEconomy = new ps({
                userID: message.author.id,
                username: message.author.tag,
                serverID: message.guild.id,
                kcoins: 1000,
                ktokens: 0,
                lastDaily: 0,
                dailycount: 0,
                diamonds: 0,
                steals: 0, 
                blocks: 0,
                trophies: 0
            });

            let curdate = Date.now();
            var timeremain = (86400000 - (curdate - userEconomy.lastDaily)) / 3600000;
            var hourremain = Math.floor(timeremain);
            var minremain = Math.floor((timeremain - Math.floor(timeremain)) * 60);

            if ((curdate - userEconomy.lastDaily < 86400000)){
                embed.setDescription("You have already received your credits today! You have " + hourremain + " hours and " + minremain + " minutes " + "remaining!")
                message.channel.send(embed);
            } else {
                embed.setAuthor(`${message.member.displayName}'s Daily`, message.author.avatarURL());

                //DAILY COUNTER
                userEconomy.dailycount++;
                let dailyCounter =  await ds.findOne({userID: message.author.id});
                if(!dailyCounter) dailyCounter = new ds({userID: message.author.id, count: 0, lastUpdated: curdate });
                if(curdate - userEconomy.lastDaily <= 86400000 * 2){
                    dailyCounter.count++;
                } else dailyCounter.count = 1, dailyCounter.lastUpdated = curdate;
                userEconomy.lastDaily = curdate;

                if(dailyCounter.count % 7 === 0){
                    embed.setDescription("***Weekly `$daily` bonus!**\n\nYou've done !daily 7 times in a row. You've earned 2000 extra KCoins!");
                    userEconomy.kcoins += 2000;
                    message.channel.send(embed);
                }
                
                dailyCounter.save().catch(err => console.log(err));

                //GIVE CREDITS
                let creditstogive = 500;
                userEconomy.kcoins += creditstogive;

                //GIVE TOKEN
                let tokenstogive = 1;

                //INCREMENT lastDaily
                userEconomy.lastDaily = Date.now();

                userEconomy.save().catch(err => console.log(err));

                let before = userEconomy.ktokens;
                let after = Math.min(userEconomy.ktokens + tokenstogive, 5); //limit tokens to 5
                userEconomy.ktokens = after;

                let tokenMessage = "none";

                if(after > before && after == 5) { //Just reached 5
                    tokenMessage = `You earned **${after - before} token${after - before === 1 ? "" : "s"}**! You have now reached the **maximum number of 5 tokens**, so you should spend them with \`$treasurebox.\``;
                } else if (after === before && after === 5) { //STILL AT 5
                    tokenMessage = "**You have the maximum number of tokens, so you did not earn any today!** Spend them with `$treasurebox.`";
                } else { //EARNED SOME
                    tokenMessage = `You earned **${after - before} token${after - before === 1 ? "" : "s"}**! You now have **${after} token${after === 1 ? "" : "s"} total**.\nYou can spend ${after === 1 ? "it" : "them"} with \`$treasurebox.\``;
                }

                embed.setDescription(tokenMessage +`\n\nYou got **${creditstogive} KCoins!** Come back tomorrow to get your daily KCoins!`);
                embed.setColor("#00FF00");
                message.channel.send(embed);
                }
        }
        else {
            message.channel.bulkDelete(1, true);
            message.channel.send("Please issue this command on `<@755992684572966965>` channel")
        .then(msg => {
            msg.delete({timeout: 5000})
        });
        }
        
    }

}