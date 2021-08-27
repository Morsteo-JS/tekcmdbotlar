/*// ROL LOG //
client.on("guildMemberRoleAdd", (member, role) => {
  client.channels.cache.get(channels.rollog).send(`${member.user.tag} kullanıcısına \`${role.name}\` rolü eklendi.`);
});

client.on("guildMemberRoleRemove", (member, role) => {
  client.channels.cache.get(channels.rollog).send(`${member.user.tag} kullanıcısından \`${role.name}\` rolü kaldırıldı.`);
});

// 
const qdbm = require("quick.db")

client.on("ready", async () => {
  let gecicidur = db.get(`gecicidurma`)      
  if (gecicidur == "true") return;
  let tableeee = new qdbm.table("mateasytag");
  let yasakolansimge = await tableeee.get(`mateasytag.yasaklitaglar`)
  setInterval(async () => {
  client.guilds.cache.forEach(async guild => {
  client.guilds.cache.get(guild.id).members.cache.map(async mateassaaaa => {
    let yasaklıtaglıuyevar = false
    for (let yasakliiii in yasakolansimge) {
      if (mateassaaaa.user.username.includes(yasakolansimge[yasakliiii])) 
      yasaklıtaglıuyevar = true
    };
    if (yasaklıtaglıuyevar) {
      if (mateassaaaa.roles.cache.get(roles.YasaklıTag)) return;
      mateassaaaa.roles.set([roles.YasaklıTag]).catch(() => {})
      mateassaaaa.send("İsminde bulunan yasaklı tagdan dolayı sunucumuzda yasaklı taga atıldın.İsmindeki yasaklı tagı kaldırarak sunucumuza erişim sağlayabilirsin. Eğer herhangi bir problemin varsa üst yöneticilerimize ulaşmaktan çekinme !")
    };
  });
  })
  },  3000);
});*/