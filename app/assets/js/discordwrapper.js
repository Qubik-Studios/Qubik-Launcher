const http = require('http')
const fs = require('fs')
const logger = require('./loggerutil')('%c[DiscordWrapper]', 'color: #7289da; font-weight: bold')
const motdlogger = require('./loggerutil')('%c[Discord-MOTD]', 'color: #7289da; font-weight: bold')

const RPC = require('discord-rpc')
const rpc = new RPC.Client({
    transport: 'ipc'
})


// MOTD System

/*
let arr = ['Made in Germany!', 'YEET!', 'Qubik Client', 'BETA!', 'Who has cake?', 'You shouldn\'t see this...', 'BETA!', 'NULL', 'BETA!', 'Maxthier was here', 'ConmineLP was here', 'You arent here...', 'BETA!']
*/

const file = fs.createWriteStream(process.env.APPDATA + '/Qubik Launcher/motd.txt')
http.get('http://data.qubik-studios.net/data/QubikClient/motd.txt', response => {response.pipe(file)})

let data = fs.createReadStream(process.env.APPDATA + '/Qubik Launcher/motd.txt')
let fileData = fs.readFileSync(process.env.APPDATA + '/Qubik Launcher/motd.txt',{encoding:'utf8'});
motdlogger.log(fileData)


let motdraw = ['TEMP']
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