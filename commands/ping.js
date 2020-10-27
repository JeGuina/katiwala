module.exports = {
    name: "ping",
    description: "pings the pong",

    async run (client, message, args){
        return message.reply("Pong! "+Math.round(client.ws.ping));
    }
}