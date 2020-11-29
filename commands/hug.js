module.exports = {
    name: "hug",
    description: "comfort someone with a virtual hug!",

    async run (client, message, args){
        if(!args[0]){
            message.channel.send("Please specify who you want to hug... unless you want to hug yourself ✊😔");
        }
        else {
            var user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            message.channel.send(`🤗 | ${message.member.displayName} is here for <@${user.id}>! Sending some virtual hugs! Kaya mo yan!`);
        }

    }
}