const JFile = require('jfile')
const logger = require('./loggerutil')('%c[DiscordWrapper]', 'color: #7289da; font-weight: bold')
const motdlogger = require('./loggerutil')('%c[Discord-MOTD]', 'color: #7289da; font-weight: bold')

const RPC = require('discord-rpc')
const rpc = new RPC.Client({
    transport: 'ipc'
})


// MOTD V2 System
/** MOTD v2
 * New MOTD system enables the ability to 
 * sync the MOTD word list with a server.
 * For server change you need to go into the index.js
 * down to line 339.
 *
 * OLD MOTD ARRAY
 * 
 * let arr = ['Made in Germany!', 'YEET!', 'Qubik Client', 'BETA!', 'Who has cake?', 'You shouldn\'t see this...', 'BETA!', 'NULL', 'BETA!', 'Maxthier was here', 'ConmineLP was here', 'You arent here...', 'BETA!']
 */
let myF=new JFile(process.env.APPDATA + '\\..\\Local\\Programs\\Qubik Launcher\\QubikLauncher\\motd.txt')
motdlogger.log('Readed file: ' + myF.lines)


let motdraw = myF.lines
const motd = motdraw[Math.floor(Math.random() * motdraw.length)]

motdlogger.log('Current MOTD-List: ' + motdraw)
motdlogger.log('Current MOTD: ' + motd)

logger.log('RPC Init')

rpc.on('ready', () => {
    rpc.setActivity({
        details: 'Qubik-Studios.net',
        state: motd,
        startTimestamp: new Date(),
        largeImageKey: 'qubik_client_logo',
        largeImageText: 'Qubik Launcher',
        smallImageKey: 'alpha',
        smallImageText: 'v0.1.1-Beta.0'
    })

    logger.log('RPC Init finished..')
})

rpc.login({
    clientId: '806600071088308224'
})
logger.log('RPC Started!')