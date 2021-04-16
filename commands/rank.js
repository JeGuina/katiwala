const Discord = require('discord.js');
const Canvacord = require('canvacord');
const db = require('quick.db');

module.exports = {
    name: "rank",
    description: "View a member's rank",

    execute(client, message, args) {
        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

        let level = client.db.get(`level_${user.id}`) || 0;
        level = level.toString();
        let exp = (client.db.get(`xp_${user.id}`) || 0).toString();
        let neededXP = Math.floor(Math.pow(level / 0.1, 2)).toString();

        let every = client.db
        .all()
        .filter(i => i.ID.startsWith("xp_"))
        .sort((a, b) => b.data - a.data);

        let rank = every.map(x => x.ID).indexOf(`xp_${user.id}`) + 1;
        rank = rank.toString();

        const card = Canvacord.rank({
            username: user.username,
            discrim: user.discriminator,
            status: user.presence.status,
            level: level,
            rank: rank,
            neededXP: neededXP.toString(),
            currentXP: exp.toString(),
            avatarURL: user.displayAvatarURL({ format: "jpg" }),
            background: Canvacord.color("#121212")
        });

        const attachment = new Discord.MessageAttachment(card, "rank.png");
        return message.channel.send(attachment);
    }
}