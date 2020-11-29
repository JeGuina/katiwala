module.exports = {
    name: "cookie",
    description: "give another user a cookie!",

    async run (client, message, args){
        if(!args[0]){
            message.channel.send("You cannot give yourself a cookie!");
        }
        else {
            var user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            message.channel.send(`🍪 | ${message.member.displayName} gave <@${user.id}> a cookie!`);
        }


    }
}