require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

client.commands = new Discord.Collection();
const picExt = [".webp",".png",".jpg",".jpeg",".gif"];
const vidExt = [".mp4",".webm",".mov"];

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
    client.user.setActivity(`with ${memberCount} crewmates`, { type: "PLAYING" });
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(channel => channel.name === "welcome");
    if(!channel) return;

    channel.send(`Yo! What's up, ${member}? Welcome to **TRUST ISSUES PH** Server! Enjoy!`);
    const guild = client.guilds.cache.get("750710232887591013");
    var memberCount = guild.members.cache.filter(member => !member.user.bot).size;
    client.user.setActivity(`with ${memberCount} members`, { type: "PLAYING" });
});

client.on('guildMemberRemove', () => {
    const guild = client.guilds.cache.get("750710232887591013");
    var memberCount = guild.members.cache.filter(member => !member.user.bot).size;
    client.user.setActivity(`with ${memberCount} members`, { type: "PLAYING" });
});

client.on('messageDelete', async message => {
    if(message.author.bot) return;
    const logchannel = message.guild.channels.cache.find(ch => ch.name === "message-logs")
    const vchan = message.channel.id == '765833025216053249';
    if(!logchannel) return;

    if(vchan){
        return
    }
    else {

    const embed = new Discord.MessageEmbed()
    .setTitle("Message deleted | " +message.author.tag)
    .addField("Deleted", `${message.content.slice(0, 950)}\n\u200b`)
    .addField("In Channel", message.channel)

    logchannel.send(embed);
    }
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

client.on("message", async (message) => {
    if(message.author.bot) return;
    if(message.channel.type == 'dm') {
        if (message.content.length > 1024) return message.channel.send('Your message should be no longer than 1024 characters');
        else {
            await message.react('👍');
            message.channel.send('Your message has been anonymously sent!');
            let count = JSON.parse(fs.readFileSync('./count.json')).count;
            let d = new Date();
            count++;

            if(message.content == ""){
                message.content = "n/a";
            }
            const cChanId = '765833025216053249';
            const confessChan = client.channels.cache.get(cChanId);
            if(!confessChan) return;
            const embed = new Discord.MessageEmbed()
            .setTitle("Anon #" +count)
            .addField("Message", `${message.content}`)
            .setFooter(new Date(d.toLocaleString()))
            if(message.attachments.array().length > 0) {
            let attachment = message.attachments.array()[0];
            picExt.forEach(ext => {
                if(attachment.name.endsWith(ext)) embed.setImage(attachment.attachment);
            });
            vidExt.forEach(ext => {
                if(attachment.name.endsWith(ext)) confessChan.send(attachment);
            });
        }
            confessChan.send(embed);
            fs.writeFileSync('./count.json', JSON.stringify({ count: count }));

        }
    }
    // xp(message); **for XP stuff soon

    if(message.content.startsWith(prefix)){
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if(!command) return;

        try{
            command.run(client, message, args);
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
//             message.channel.send(`:tada: GG! **${message.author.toString()}!** You just advanced to level **${newLevel}!**`);
//         }
//         client.cooldown.set(`${message.author.id}`, Date.now());
//     }
// }

//remove comment for xp stuff sooooon

client.login(process.env.BOT_TOKEN);