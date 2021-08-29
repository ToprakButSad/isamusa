const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const moment = require('moment')
require('moment-duration-format')
moment.locale('tr')

exports.run = async (client, message, args) => {
const Embed = new Discord.MessageEmbed()
.setColor('BLUE')
.setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
.setThumbnail(message.guild.iconURL({dynamic:true}))
.addField('» Sunucu Adı',message.guild.name,true)
.addField('» Sunucu Sahibi', client.users.cache.get(message.guild.ownerID).tag,true)
.addField('» Sunucu ID',message.guild.id,true)
.addField(`» Kanal Sayısı [${message.guild.channels.cache.filter(Channel => Channel.type == 'voice').size + message.guild.channels.cache.filter(Channel => Channel.type == 'text').size}]`,`🔉 ${message.guild.channels.cache.filter(Channel => Channel.type == 'voice').size} | 💬 ${message.guild.channels.cache.filter(Channel => Channel.type == 'text').size}`,true)
.addField('» Eklenme Tarihim', moment(message.guild.members.cache.get(client.user.id).joinedAt).format('LLL'),true)
.addField('» Oluşturulma Tarihi', moment(message.guild.createdAt).format('LLL'),true)
.addField('» Katılma Tarihin', moment(message.guild.members.cache.get(message.author.id).joinedAt).format('LLL'),true)
.addField('» Toplam Partner Sayısı',db.fetch(`PC_${message.guild.id}`) || 0)
.setFooter(message.author.tag,message.author.avatarURL({dynamic:true}))
message.channel.send(Embed)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['sb','sunucubilgi','sunucu-bilgi'],
    permLevel: 0
  }
  
  exports.help = {
    name: 'Sunucu Bilgi',
    description: 'Sunucu Bilgisini Atar.',
    usage: 'sb'
  }