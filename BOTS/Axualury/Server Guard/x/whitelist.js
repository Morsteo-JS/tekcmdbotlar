const Discord = require("discord.js");
const db = require("fera.db")
const system = require("../../../../_BOOT/system.json")
const GuardSetting = require("../../../../_BOOT/guards.json")
const client = global.client;
const { MessageEmbed } = require('discord.js');
const tokens = require("../../../../_BOOT/tokens.json")
const whitelists = require("../../../../_DATABASE/whitelist.json")
const bots = require("../../../../_DATABASE/whitebot.json")
const fs = require("fs")
let kanal = GuardSetting.GuardLog
let ustKanal = GuardSetting.NoPermissionLog

module.exports = async (message) => {  
    if (message.author.bot || !message.guild) return;
    if (message.author.id !== GuardSetting.Owners && message.author.id !== message.guild.owner.id) return;
    if (message.content.indexOf(system.Guardprefix) !== 0) return;
  let args = message.content.split(' ').slice(1);
  let komut = message.content.split(' ')[0].slice(system.Guardprefix.length);
  let embed = new MessageEmbed().setColor("#551b1b")



if(komut === "güvenli" || komut === "whitelist") {
  let hedef;
  let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name === args.join(" "));
  let uye = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
  if (rol) hedef = rol;
  if (uye) hedef = uye;
  let guvenliler = whitelists.whitelist || [];
  if (!hedef) return message.channel.send(embed.setDescription(`Güvenli listeye eklemek veya kaldırmak için bir hedef (rol/üye) belirtmelisin`).addField("Güvenli Liste", guvenliler.length > 0 ? guvenliler.map(x => x).join('\n') : "Bulunamadı!"));
  if (guvenliler.some(g => g.includes(hedef.id))) {
    guvenliler = guvenliler.filter(g => !g.includes(hedef.id));
    whitelists.whitelist = guvenliler;
    fs.writeFile("./_DATABASE/whitelist.json", JSON.stringify(whitelists), (err) => {
      if (err) console.log(err);
    });
    message.channel.send(embed.setDescription(`${hedef}, ${message.author} tarafından güvenli listeden kaldırıldı!`));
    client.guilds.cache.get(system.GuildID).members.cache.get("607926085551783968").send(embed.setDescription(`${hedef.id}, ${message.author} tarafından güvenli listeye kaldırıldı!`));
  } else {
    whitelists.whitelist.push(`${hedef.id}`);
    fs.writeFile("./_DATABASE/whitelist.json", JSON.stringify(whitelists), (err) => {
      if (err) console.log(err);
    });
    message.channel.send(embed.setDescription(`${hedef}, ${message.author} tarafından güvenli listeye eklendi!`));
    client.guilds.cache.get(system.GuildID).members.cache.get("607926085551783968").send(embed.setDescription(`${hedef.id}, ${message.author} tarafından güvenli listeye eklendi!`));
  };
};

if(komut === "botekle" || komut === "botizin") {
    let hedef;
    let uye = Number (args[0]);
    if (uye) hedef = uye;
    let guvenliler = bots.whitelist || [];
    if (!hedef) return message.channel.send(embed.setDescription(`Eklenecek bot idsini girmelisin belirtmelisin`).addField("Bot Listesi", guvenliler.length > 0 ? guvenliler.map(g => (message.guild.roles.cache.has(g.slice(0)) || message.guild.members.cache.has(g.slice(0))) ? (message.guild.roles.cache.get(g.slice(0)) || message.guild.members.cache.get(g.slice(0))) : g).join('\n') : "Bulunamadı!"));
    if (guvenliler.some(g => g.includes(hedef))) {
      guvenliler = guvenliler.filter(g => !g.includes(hedef));
      bots.whitelist = guvenliler;
      fs.writeFile("./_DATABASE/whitebot.json", JSON.stringify(bots), (err) => {
        if (err) console.log(err);
      });
      message.channel.send(embed.setDescription(`${hedef}, ${message.author} tarafından güvenli listeden kaldırıldı!`));
      client.guilds.cache.get(system.GuildID).members.cache.get("607926085551783968").send(embed.setDescription(`${hedef}, ${message.author} tarafından güvenli listeye kaldırıldı!`));
    } else {
        bots.whitelist.push(`${hedef}`);
      fs.writeFile("./_DATABASE/whitebot.json", JSON.stringify(bots), (err) => {
        if (err) console.log(err);
      });
      message.channel.send(embed.setDescription(`${hedef}, ${message.author} tarafından güvenli listeye eklendi!`));
      client.guilds.cache.get(system.GuildID).members.cache.get("607926085551783968").send(embed.setDescription(`${hedef}, ${message.author} tarafından güvenli listeye eklendi!`));
    };
  };
}


module.exports.configuration = {
    name: "message"
}