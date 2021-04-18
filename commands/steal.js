const ps = require("../models/Economy");
const Discord = require("discord.js");


module.exports = {
    name: "steal",
    description: "steal diamonds",
    aliases: ["steal", "s"],
    execute: async function(client, message, args){

        let comchan = '755992684572966965';
        let testchan = '757423283367968942';
        let embed = new Discord.MessageEmbed();

        if(message.channel.id == comchan || message.channel.id == testchan){
            if (!message.mentions || !message.mentions.members || !message.mentions.members.first()) return;
        let mentioned = message.mentions.members.first();
        if (mentioned.id === "437900682222108673") {
            embed.setDescription("You cannot steal from Wu. Wu will steal from you. ;)"); return message.channel.send(embed);
        }
        if (mentioned.id === message.author.id) {embed.setDescription("You can't steal from yourself..."); return message.channel.send(embed);}

        let stealerEconomy = await ps.findOne({userID: message.author.id});
        let stolenEconomy = await ps.findOne({userID: mentioned.id});

        if (stealerEconomy.steals < 1) {embed.setDescription("You don't have any steals!"); return message.channel.send(embed);}
        if (stolenEconomy.diamonds < 1) {embed.setDescription(`${mentioned} doesn't have any diamonds!`); return message.channel.send(embed)};

        if (stolenEconomy.blocks > 0) {
            if (Math.random() <= 0.7) {
                embed.setDescription(mentioned + "'s block was successful! Your attempt to steal a diamond failed.");
                await message.channel.send(embed);
                stealerEconomy.steals--;
                stolenEconomy.blocks--;
            } else {
                embed.setDescription(mentioned + "'s block failed! You successfully stole a diamond!")
                await message.channel.send(embed);
                stealerEconomy.steals--;
                stolenEconomy.blocks--;
                stealerEconomy.diamonds++;
                stolenEconomy.diamonds--;
            }
        } else {
            embed.setDescription(`You successfully stole a diamond from ${mentioned}!`).setColor(message.member.displayHexColor);
            await message.channel.send(embed);
            stealerEconomy.steals--;
            stealerEconomy.diamonds++;
            stolenEconomy.diamonds--;
        }
        if (stealerEconomy.diamonds >= 10) {
            stealerEconomy.diamonds = stealerEconomy.diamonds % 10;
            stealerEconomy.kcoins+=2500;
            stealerEconomy.trophies++;
            embed.setDescription("You reached 10 diamonds and won a trophy and 2500 KCoins! Check the trophy leaderboard with `$trophyboard`" ).setColor(msg.member.displayHexColor);
            await message.channel.send(embed);
        }
        await stealerEconomy.save();
        await stolenEconomy.save();
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