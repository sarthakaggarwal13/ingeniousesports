const client = require('../index.js')

client.on('ready', async () => {
    console.log(client.user.tag + ' Has Logged In! ✅');
})