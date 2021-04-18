const ps = require("../models/Economy");
const Discord = require("discord.js");


module.exports = {
    name: "treasurebox",
    description: "time to get dirty",
    aliases: ["tb", "treasure"],
    execute: async function(client, message, args){
        
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

            if(userEconomy.ktokens < 1){
                embed.setDescription(`"You don't have any tokens!"`);
                return message.channel.send(embed);
            }
            let prizes = [];
            class Prize {
                constructor(description, chance, execute){
                    this.description = description;
                    this.chance = chance;
                    this.execute = execute;
                }
            async award() {
                embed.setDescription(`${message.member}, ` + this.execute());
                await message.channel.send(embed);
                return embed;
            }    
        }

        prizes.push(new Prize("a steal", 20, () => {
            userEconomy.steals++;
            return "You won a `steal`! Simply use `$steal @user` to take one of their diamonds. If they have a `block`, your attempt will fail 70% of the time and they will lose a block while you lose your steal.";
        }));
        prizes.push(new Prize("a block", 5, () => {
            userEconomy.blocks++;
            return "You won a `block`! You have a 70% chance of being protected from one $steal.";
        }));
        prizes.push(new Prize("an extra diamond", 15, () => {
            userEconomy.diamonds++;
            return "You won an extra diamond!";
        }));
        prizes.push(new Prize("500 Credits", 25, () => {
            userEconomy.kcoins+=500;
            return "`You won " + 500 + " credits!`";
        }));
        prizes.push(new Prize("1000 Credits", 10, () => {
            userEconomy.kcoins+=1000;
            return "`You won " + 1000 + " credits!`";
        }));
        prizes.push(new Prize("2500 Credits", 5, () => {
            userEconomy.kcoins+=2500;
            return "`You won " + 2500 + " credits!`";
        }));
        prizes.push(new Prize("nothing", 20, () => {
            return "You won nothing :(";
        }));
        let prizes_array = [];
        for (let prize of prizes) {
            for (let i = 0; i < prize.chance; i++) {
                prizes_array.push(prize);
            }
        }

        //CHOOSE PRIZE
        let chosen_prize = prizes_array[Math.floor(Math.random() * prizes_array.length)];
        let prizeEmbed = await chosen_prize.award(message);
        userEconomy.ktokens--;
        userEconomy.diamonds++;

        if (userEconomy.diamonds >= 10) {
            userEconomy.diamonds = userEconomy.diamonds % 10;
            userEconomy.kcoins+=2500;
            userEconomy.trophies++;
            embed.setDescription("You reached 10 diamonds and won a trophy and 2500 Kcoins! Check the trophy leaderboard with `$trophyboard`").setColor(prizeEmbed.color);
            message.channel.send(embed);
        }

        userEconomy.save();
        embed.setDescription(`You have **${userEconomy.ktokens} ktoken${userEconomy.ktokens === 1 ? "" : "s"}** remaining and you now have **${userEconomy.diamonds} diamond${userEconomy.diamonds === 1 ? "" : "s"}**!`).setColor(prizeEmbed.color)
        message.channel.send(embed);
        
        } else {
            message.channel.bulkDelete(1, true);
            message.channel.send("Please issue this command on `<@755992684572966965>` channel")
        .then(msg => {
            msg.delete({timeout: 5000})
        });
        }
    
    }
}