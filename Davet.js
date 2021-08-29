const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
const Embed = new Discord.MessageEmbed()
.setColor('BLUE')
.setAuthor(message.author.tag,message.author.avatarURL({dynamic:true}))
.setFooter(client.user.username,client.user.avatarURL())
.setThumbnail(client.user.avatarURL())
.setDescription(`> Görünen o ki Botumuzu Beğendin Ve Davet Edeceksin.
> \`${ayarlar.prefix}yardım\` Yazarak Daha Detaylı İnceleyebilirsiniz.`)
.addField('BOT Davet',`[Davet et!](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)`,true)
.addField('Destek Sunucusu',`[Destek sunucusu](${ayarlar.destek})`,true)
.addField('Oy Ver',`[Tıkla!](https://botsfordiscord.com/bot/${client.user.id}/vote)`,true)
.setTimestamp()
message.channel.send(Embed)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['davet','invite'],
  permLevel: 0
}

exports.help = {
  name: 'Davet',
  description: 'Davet Linki',
  usage: 'davet'
}