const logger = require('./loggerutil')('%c[DiscordWrapper]', 'color: #7289da; font-weight: bold')

const RPC = require('discord-rpc')
const rpc = new RPC.Client({
    transport: 'ipc'
})

// MOTD System

let arr = ['Made in Germany!', 'YEET!', 'Qubik Client', 'Who has cake?', 'You shouldn\'t see this...', 'NULL', 'Maxthier was here', 'ConmineLP was here', 'You arent here...']
const motd = arr[Math.floor(Math.random() * arr.length)]
logger.log('Current MOTD-List: ' + arr)
logger.log('Current MOTD: ' + motd)

logger.log('RPC Started')

rpc.on('ready', () => {
    rpc.setActivity({
        details: 'Qubik-Studios.net',
        state: motd,
        startTimestamp: new Date(),
        largeImageKey: 'qubik_client_logo',
        largeImageText: 'Qubik Launcher',
        smallImageKey: 'beta',
        smallImageText: 'PreBeta 1'
    })

    logger.log('Rich presence ready!')
})

rpc.login({
    clientId: '806600071088308224'
})