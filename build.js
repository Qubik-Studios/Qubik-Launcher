const builder = require('electron-builder')
const Platform = builder.Platform

function getCurrentPlatform(){
    switch(process.platform){
        case 'win32':
            return Platform.WINDOWS
        case 'darwin':
            return Platform.MAC
        case 'linux':
            return Platform.linux
        default:
            console.error('Cannot resolve current platform!')
            return undefined
    }
}

builder.build({
    targets: (process.argv[2] != null && Platform[process.argv[2]] != null ? Platform[process.argv[2]] : getCurrentPlatform()).createTarget(),
    config: {
        appId: 'qubik-launcher',
        productName: 'Qubik Launcher',
        artifactName: '${productName}-${version}-setup.${ext}',
        copyright: 'Copyright © 2021 Qubik Studios',
        directories: {
            buildResources: 'build',
            output: 'dist'
        },
        win: {
            target: [
                {
                    target: 'nsis',
                    arch: 'x64'
                }
            ]
        },
        nsis: {
            oneClick: false,
            perMachine: false,
            allowElevation: true,
            allowToChangeInstallationDirectory: true,
            installerIcon: 'build/installerIcon.ico',
            uninstallerIcon: 'build/uninstallerIcon.ico',
            installerHeader: 'build/installerHeader.bmp',
            installerSidebar: 'build/buildinstallerSidebar.bmp',
            uninstallerSidebar: 'build/buildinstallerSidebar.bmp',
            uninstallDisplayName: 'Uninstall Qubik Launcher',
            license: 'build/EULA.html',
            createStartMenuShortcut: true,
            menuCategory: true
        },
        mac: {
            target: 'dmg',
            category: 'public.app-category.games'
        },
        linux: {
            target: 'AppImage',
            maintainer: 'Qubik Studios',
            vendor: 'Qubik Studios',
            synopsis: 'Qubik Client launcher',
            description: 'The Official launcher from the Qubik Client',
            category: 'Game'
        },
        compression: 'maximum',
        files: [
            '!{dist,.gitignore,.vscode,docs,dev-app-update.yml,.travis.yml,.nvmrc,.eslintrc.json,build.js}'
        ],
        extraResources: [
            'libraries'
        ],
        asar: true
    }
}).then(() => {
    console.log('Build complete!')
}).catch(err => {
    console.error('Error during build!', err)
})