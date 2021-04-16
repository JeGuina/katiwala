module.exports = {
    name: "ping",
    description: "pings the pong",
    execute(client, message, args){
        return message.reply("Pong! "+Math.round(client.ws.ping));
    }
}