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

    await guild.fetchAuditLogs({
        type: "MEMBER_BAN_ADD"
    }).then(async (audit) => {
        let ayar = audit.entries.first()
        let yapan = ayar.executor
        let hedef = ayar.target
        if (Date.now() - ayar.createdTimestamp > 5000) return;
        if (yapan.id == client.user.id) return;
        let embed = new MessageEmbed().setColor("#551b1b")
  if (guvenli(yapan.id)) return;
        let banLimit = client.banLimit.get(yapan.id) || 0
        banLimit++
        client.banLimit.set(yapan.id, banLimit)
        if (banLimit == 3) {
            await guild.members.ban(yapan.id, {
                reason: "Birden fazla kullanıcıya sağ tık ban işlemi uygulamak"
            }).catch(e => client.channels.cache.get(ustKanal).send(embed.setDescription("<@" + yapan.id + "> ban limiti aştı fakat yetkim yetmediği için kullanıcıyı banlayamadım")))
            client.blackList.push(yapan.id)
            client.banLimit.delete(yapan.id)
            client.channels.cache.get(kanal).send(embed.setDescription("<@" + yapan.id + "> ban limiti aştığı için kullanıcıyı banladım."))
        }
        setTimeout(() => {
            if (client.banLimit.has(yapan.id)) {
                client.banLimit.delete(yapan.id)
            }
        }, ms("1m"))
})
}


module.exports.configuration = {
    name: "guildBanAdd"
}