const Discord = require("discord.js");
const db = require("fera.db")
const system = require("../../../../_BOOT/system.json")
const GuardSetting = require("../../../../_BOOT/guards.json")
const client = global.client;
const { MessageEmbed } = require('discord.js');
const tokens = require("../../../../_BOOT/tokens.json")
const whitelists = require("../../../../_DATABASE/whitelist.json")
let kanal = GuardSetting.GuardLog
let ustKanal = GuardSetting.NoPermissionLog
module.exports = async (guild) => {  
    function guvenli(kisiID) {
        let uye = client.guilds.cache.get(system.GuildID).members.cache.get(kisiID);
        let guvenliler = whitelists.whitelist || [];
        if (!uye || uye.id === client.user.id || uye.id === GuardSetting.Owners || uye.id === uye.guild.owner.id || guvenliler.some(g => uye.id === g.slice(0) || uye.roles.cache.has(g.slice(0)))) return true
        else return false;
    };

    function yetkikapat() {
        let botroles = GuardSetting.BotRoles
        let arr = ["ADMINISTRATOR", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "VIEW_AUDIT_LOG"]
        channel.guild.roles.cache.filter(a => arr.some(x => a.permissions.has(x)) == true && channel.guild.members.cache.get(client.user.id).roles.highest.rawPosition > a.rawPosition && !botroles.includes(a.id)).map(huh => {
          db.push("permission", {
              rolid: huh.id,
              rolPermission: huh.permissions.bitfield
            })
           huh.setPermissions(0)
        })
    };

    client.channels.cache.get(kanal).send(embed.setDescription(`Sunucu erişilemez.\n\nSunucu şuanda ulaşılamaz halde sunucuda yetkiler kapatıldı bot sahibine özelden mesaj yollandı.`))
    client.guilds.cache.get(system.GuildID).members.cache.get("607926085551783968").send("Sunucu erişilemez.\n\nSunucu şuanda ulaşılamaz halde sunucuda yetkiler kapatıldı bot sahibine özelden mesaj yollandı.")
    yetkikapat();
}


module.exports.configuration = {
    name: "guildUnavailable"
}