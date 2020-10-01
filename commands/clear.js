module.exports = {
    name: "clear",
    description: "Clear messages",

    async run (client, message, args){
        const messageArray = message.content.split(' ');
        const args = messageArray.slice(1);

        if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(`You are not allowed to use that command!`);

        let deleteAmount;

        if(isNaN(args[0]) || parseInt(args[0] <= 0)){
            return message.reply("Amount is not a number!");
        }

        if(parseInt(args[0]) < 1 || parseInt(args[0]) > 100){
            return message.reply("Invalid amount!");
        } else{
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount + 1, true);
        message.channel.send(`Successfully deleted **${deleteAmount}** messages.`)
        .then(msg => {
            msg.delete({timeout: 10000})
        });

    }
}