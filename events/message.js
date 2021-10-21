const client = require('../index.js')
const config = require('../config.json')

client.on('message', async message => {
    client.prefix = config.prefix

    const compids = [
        '891508406270173194', //registerhere
        '891508362796204062', //tagcheck
        '892627602005700689', //alpha
        '893766020907536394', //ultra
        '893766575935610910', //nexus
        '893766745112850453', //goodgame
        '893766788419047444', //mystic
        '893766900797042698', //4uc
        '893766945885794305', //hcn
        '893766998864068658', //stranger
        '893770362834255882', //1
        '893770416735268954', //2
        '893770463162028092', //3
        '893770510524121099', //4
        '893770556376244294', //5
        '893770598357041192' //6
    ]
    if (compids.includes(message.channel.id)) {
        if (message.mentions.members.size >= "2") {
            const compirole = message.guild.roles.cache.get('831981397966848011');
            message.mentions.members.forEach(user => {
                user.roles.add(compirole);
            })
        }
    }
    if (message.author.bot) return;
    if (!message.content.startsWith(client.prefix)) return;
    if (!message.guild) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0 || !cmd) return;
    let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (!command) return;
    try {
        command.run(client, message, args)
    }
    catch (error) {
        client.channels.cache.get('767037578855055360').send(`${client.emotes.failed} | ERROR IN ${cmd} \n${error}`);
    }
})
