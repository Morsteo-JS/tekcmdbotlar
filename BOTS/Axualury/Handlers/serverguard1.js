const fs = require("fs");
fs.readdir("./BOTS/Axualury/Server Guard/x/", (err, files) => {
    if(err) return console.error(err);
    
    files.filter(file => file.endsWith(".js")).forEach(file => {
        
        let prop = require(`../Server Guard/x/${file}`);
        if(!prop.configuration) return;
        client.on(prop.configuration.xserver, prop);
    });
});

fs.readdir("./BOTS/Axualury/Channel Guard/x/", (err, files) => {
    if(err) return console.error(err);
    
    files.filter(file => file.endsWith(".js")).forEach(file => {
        let prop = require(`../Channel Guard/x/${file}`);
        if(!prop.configuration) return;
        client.on(prop.configuration.xchannel, prop);
    });
});