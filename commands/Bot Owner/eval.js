module.exports = {
    name: 'eval',
    aliases: ['e'],

    description: 'Evalutes Given Code',

    category: 'botowner',
    run: async (client, message, args) => {
        if (client.dev.includes(message.author.id)) {
            const msg = await message.reply(`${client.emotes.success} | Evaluating....!`);
            try {
                const data = eval(args.join(' ').replace(/```/g, ''));
                const embed = `${client.emotes.success} | `+ await data
                await msg.edit(embed)
            }
            catch (e) {
                const embed = `${client.emotes.failed} | Error!`
                return await msg.edit(embed);
            }
        } 
        else return;
    }
}