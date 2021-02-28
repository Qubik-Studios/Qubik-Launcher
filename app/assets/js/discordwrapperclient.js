const logger = require('./loggerutil')('%c[DiscordWrapper]', 'color: #7289da; font-weight: bold')

const {Client} = require('discord-rpc')
const RPC = require('discord-rpc')

let client
let activity

logger.log('Preparing Discord RPC...')

const rpc = new RPC.Client({
    transport: 'ipc'
})

logger.log('Pre-RPC Preparing started...')

rpc.on('ready', () => {
    rpc.setActivity({
        details: 'Qubik-Studios.net',
        state: 'Sitting in: Launcher',
        startTimestamp: new Date(),
        largeImageKey: 'qubik_client_logo',
        largeImageText: 'Qubik Launcher',
        smallImageKey: 'beta',
        smallImageText: 'PreBeta 1'
    })

    logger.log('Pre-RPC Preparing finished...')
    logger.log('Pre-RPC ready for Startup!')
})

rpc.login({clientId: '806600071088308224'}).catch(error => {
    if(error.message.includes('ENOENT')) {
        logger.log('Pre-RPC cant connect! Discord Client not found!.')
    } else {
        logger.log('Pre-RPC cant connect! ' + error.message, error)
    }
})


exports.initRPC = function(genSettings, servSettings, initialDetails = 'Sitting in Launcher'){
    client = new Client({ transport: 'ipc' })

    activity = {
        details: initialDetails,
        largeImageKey: 'qubik_client_logo',
        largeImageText: 'Qubik Launcher',
        smallImageKey: genSettings.smallImageKey,
        smallImageText: 'PreBeta 1',
        startTimestamp: new Date(),
        instance: false
    }

    client.on('ready', () => {
        logger.log('Discord RPC Connected')
        client.setActivity(activity)
    })
    
    client.login({clientId: '806600071088308224'}).catch(error => {
        if(error.message.includes('ENOENT')) {
            logger.log('Unable to initialize Discord Rich Presence, no client detected.')
        } else {
            logger.log('Unable to initialize Discord Rich Presence: ' + error.message, error)
        }
    })
}

exports.shutdownRPC = function(){
    if(!client) return
    client.clearActivity()
    client.destroy()
    client = null
    activity = null
}