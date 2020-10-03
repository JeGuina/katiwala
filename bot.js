require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const Canvacord = require('canvacord');

client.commands = new Discord.Collection();
client.db = require('quick.db');
client.cooldown = new Discord.Collection();

const prefix = process.env.PREFIX;

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('error', console.error);

client.on('ready', () => {
    console.log(`${client.user.tag} is now online!`);
    const guild = client.guilds.cache.get("750710232887591013");
    var memberCount = guild.members.cache.filter(member => !member.user.bot).size;
    client.user.setActivity(`with ${memberCount} members`, { type: "PLAYING" });
});



client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(channel => channel.name === "welcome");
    if(!channel) return;

    channel.send(`Yo! What's up, ${member}? Welcome to the Trust Issues PH Server! Enjoy!`);
    const guild = client.guilds.cache.get("750710232887591013");
    var memberCount = guild.members.cache.filter(member => !member.user.bot).size;
    client.user.setActivity(`with ${memberCount} members`, { type: "PLAYING" });
});

client.on('guildMemberRemove', member => {
    const guild = client.guilds.cache.get("750710232887591013");
    var memberCount = guild.members.cache.filter(member => !member.user.bot).size;
    client.user.setActivity(`with ${memberCount} members`, { type: "PLAYING" });
});

client.on('messageDelete', async message => {
    if(message.author.bot) return;
    const logchannel = message.guild.channels.cache.find(ch => ch.name === "message-logs")
    if(!logchannel) return;

    const embed = new Discord.MessageEmbed()
    .setTitle("Message deleted | " +message.author.tag)
    .addField("Deleted", `${message.content.slice(0, 950)}\n\u200b`)
    .addField("In Channel", message.channel)

    logchannel.send(embed);
});

client.on("messageUpdate", async message => {

    if(message.author.bot) return;
    let logchannel = message.guild.channels.cache.find(ch => ch.name === "message-logs")
    if(!logchannel) return

    const embed = new Discord.MessageEmbed()
    .setTitle("Message edited |" +message.author.tag)
    .addField("Before edit", `${message.content.slice(0, 950)}\n\u200b`)
    .addField("In channel", message.channel)

    logchannel.send(embed);
})

client.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type == 'dm') return;

    // xp(message); **for XP stuff soon

    if(message.content.startsWith(prefix)){
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return;

        try{
            client.commands.get(command).run(client, message, args);
        }catch(error){
            console.error(error);
        }
    }
});

// function xp(message) {
//     if (!client.cooldown.has(`${message.author.id}`) || !(Date.now() - client.cooldown.get(`${message.author.id}`) > process.env.COOLDOWN)) {
//         let xp = client.db.add(`xp_${message.author.id}`, 1);
//         let level = Math.floor(0.3 * Math.sqrt(xp));
//         let lvl = client.db.get(`level_${message.author.id}`) || client.db.set(`level_${message.author.id}`,1);;
//         if (level > lvl) {
//             let newLevel = client.db.set(`level_${message.author.id}`,level);
//             message.channel.send(`GG! :tada: **${message.author.toString()}!** You just advanced to level **${newLevel}!**`);
//         }
//         client.cooldown.set(`${message.author.id}`, Date.now());
//     }
// }

//remove comment for xp stuff sooooon


client.login(process.env.BOT_TOKEN);

