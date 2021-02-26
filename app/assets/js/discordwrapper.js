const RPC = require("discord-rpc");
const rpc = new RPC.Client({
    transport: "ipc"
});

rpc.on("ready", () => {
    rpc.setActivity({
        details: "Testing",
        state: "RPC test",
        startTimestamp: new Date(),
        largeImageKey: "qubik_client_logo",
        largeImageText: "Testing new RPC system",
        smallImageKey: "beta",
        smallImageText: "PreBeta 1"
    });

    console.log("Rich presence ready!")
});

rpc.login({
    clientId: "806600071088308224"
});