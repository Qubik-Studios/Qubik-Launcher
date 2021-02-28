const window = require('electron').remote.getCurrentWindow().title
const logger = require('./loggerutil')('%c[DiscordWrapper]', 'color: #7289da; font-weight: bold')

const RPC = require('discord-rpc')
const rpc = new RPC.Client({
    transport: 'ipc'
})

logger.log('RPC Started')

rpc.on('ready', () => {
    rpc.setActivity({
        details: 'Qubik-Studios.net',
        state: 'Sitting in: ' + window + ' Coding',
        startTimestamp: new Date(),
        largeImageKey: 'qubik_client_logo',
        largeImageText: 'Qubik Launcher',
        smallImageKey: 'beta',
        smallImageText: 'PreBeta 1'
    })

    logger.log('Rich presence ready or Reloaded!')
})

rpc.login({
    clientId: '806600071088308224'
})