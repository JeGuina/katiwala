const db = require('quick.db');
const ms = require('parse-ms');

module.exports = {
    name: "daily",
    description: "daily credits",

    async run (client, message, args){
        let timeout = 86400000;
        let amount = 200;

        let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);

        if(daily !== null && timeout - (Date.now() - daily) > 0){
            let time = ms(timeout - (Date.now() - daily));

            return message.channel.send(`You've already collected your daily credits. Come back in ${time.days}d, ${time.hours}h, ${time.minutes}m, and ${time.seconds}s`);
        } else {
            db.add(`money_${message.guild.id}_${user.id}`, amount);
        }
    }
}