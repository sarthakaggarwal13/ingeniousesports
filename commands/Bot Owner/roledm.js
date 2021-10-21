module.exports = {
    name: 'roledm',
    aliases: ['rdm'],

    category: 'admin',
    run: async (client, message, args) => {
        if (client.dev.includes(message.author.id)) {
            let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
            let msg = message.content;
            
            if (!role) return message.channel.send("No valid role mentioned!");

            try {
                msg = msg.substring(msg.indexOf(">") + 1);
            } catch (error) {
                return console.log(error);
            }

            if (!msg || msg.length <= 1) return message.channel.send(`No Message`);

            let memberarray = role.members.array();
            let membercount = memberarray.length;
            let botcount = 0;
            let successcount = 0;
            message.channel.send(`Responding to ${message.author.username} :  Sending message to all ${membercount} members of role ${role.name}.`)

            for (var i = 0; i < membercount; i++) {
                let member = memberarray[i];
                if (member.user.bot) {
                    message.channel.send(`Skipping bot with name ${member.user.username}`)
                    botcount++;
                    continue
                }
                let timeout = 61000;

                await sleep(timeout);
                if (i == (membercount - 1)) {
                    console.log(`Waited ${timeout}ms.\t\\/\tDMing ${member.user.username}`);
                } else {
                    console.log(`Waited ${timeout}ms.\t|${i + 1}|\tDMing ${member.user.username}`);
                }
                member.send(`<@${member.id}>\n${msg}`)
                    .catch(async err => {
                        message.channel.send(`I can't DM ${member}! ${err}`);
                    });
                successcount++;
            }
        }
        else return;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}