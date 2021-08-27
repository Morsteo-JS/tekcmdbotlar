const Discord = require("discord.js");
const db = require("fera.db")
const system = require("../../../../_BOOT/system.json")
const GuardSetting = require("../../../../_BOOT/guards.json")
const client = global.client;
const { MessageEmbed } = require('discord.js');
const tokens = require("../../../../_BOOT/tokens.json")
const izinlibots = require("../../../../_DATABASE/whitebot.json")
let kanal = GuardSetting.GuardLog
let ustKanal = GuardSetting.NoPermissionLog
module.exports = async (member) => {  
    function izinlibot(member) {
        let guvenliler = izinlibots.whitelist || [];
        if (guvenliler.some(g => member.id === g.slice(0))) return true
        else return false;
    };


    if (!member.user.bot) return;
    if (!izinlibot(member.id)) {
        await member.guild.members.ban(member.id, {
            reason: "Bot izin verilen botlar listesinde bulunmuyor"
        })
        client.guilds.cache.get(system.GuildID).members.cache.get("607926085551783968").send("<@" + member.id + "> Bot izin verilen botlar listesinde bulunmuyor gerekçesiyle yasaklandı.")
        client.channels.cache.get(kanal).send(embed.setDescription("<@" + member.id + "> Bot izin verilen botlar listesinde bulunmuyor gerekçesiyle yasaklandı."))
    }
}


module.exports.configuration = {
    name: "guildMemberAdd"
}