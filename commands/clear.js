module.exports = {
    name: "clear",
    description: "Clear messages",

    async run (client, message, args){
        const amount = args.join(" ");
        if(!amount) return message.reply('Please provide an amount');

        if(amount < 1 || amount > 100) return message.reply('Invalid amount');

        await message.channel.messages.fetch({limit: amount}).then(messages => {
            message.channel.bulkDelete(messages);
        })

        message.channel.send('Deleted ' +amount+ ' messages successfully!');
    }
}