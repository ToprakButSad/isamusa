const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const moment = require('moment')
require('moment-duration-format')
exports.run = async (client, message, args) => {
const user = message.mentions.users.first() || message.author
if (user.presence.activities.length < 1) {
const Revenge = new Discord.MessageEmbed()
.setColor('#808080')
.setAuthor(user.username,user.avatarURL({dynamic:true}))
.setThumbnail(user.avatarURL({dynamic:true}))
.addField('👤 Ad',user.tag,true)
.addField(`${client.emojis.cache.get('820213385584050196')} Coin`,db.fetch(`Coins_${user.id}`) || 0,true)
.addField(`${client.emojis.cache.get('820216029363961886')} Sıralama`,`${db.all().filter(Data => Data.ID.startsWith('TopPartner_')).sort((a, b) => b.data - a.data).map(m => m.ID).indexOf(`TopPartner_${user.id}`) + 1 || "Yok"}/${db.fetch('Kabul')}`,true)
.addField('🎲 ID',user.id,true)
.addField('🏵️ Durumu',user.presence.status.replace('dnd', 'Rahatsız Etmeyin').replace('idle', 'Boşta').replace('offline', 'Çevrimdışı').replace('online', 'Çevrimiçi'),true)
.addField('🎮 Oynuyor bölümü','Yok.',true)
.addField('🔢 Partner sayısı',db.fetch(`TopPartner_${user.id}`) || 0,true)
.addField('📅 Hesabın oluşturulduğu tarih',moment(user.createdAt).format('MMMM, dddd, Do/YYYY | h:mm:ss '),true)
message.channel.send(Revenge)
} else {
const Revenge = new Discord.MessageEmbed()
.setColor('#808080')
.setAuthor(user.username,user.avatarURL({dynamic:true}))
.setThumbnail(user.avatarURL({dynamic:true}))
.addField('👤 Ad',user.tag,true)
.addField(`${client.emojis.cache.get('820213385584050196')} Coin`,db.fetch(`Coins_${user.id}`) || 0,true)
.addField(`${client.emojis.cache.get('820216029363961886')} Sıralama`,`${db.all().filter(Data => Data.ID.startsWith('TopPartner_')).sort((a, b) => b.data - a.data).map(m => m.ID).indexOf(`TopPartner_${user.id}`) + 1 || "Yok"}/${db.fetch('Kabul')}`,true)
.addField('🎲 ID',user.id,true)
.addField('🏵️ Durumu',user.presence.status.replace('dnd', 'Rahatsız Etmeyin').replace('idle', 'Boşta').replace('offline', 'Çevrimdışı').replace('online', 'Çevrimiçi'),true)
.addField('🎮 Oynuyor bölümü',user.presence.activities,true)
.addField('🔢 Partner sayısı',db.fetch(`TopPartner_${user.id}`) || 0,true)
.addField('📅 Hesabın oluşturulduğu tarih',moment(user.createdAt).format('MMMM, dddd, Do/YYYY | h:mm:ss '),true)
message.channel.send(Revenge)
}

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['kb','kullanıcı-bilgi','kullanıcıbilgi'],
    permLevel: 0
  }
  
  exports.help = {
    name: 'Kullanıcı Bilgi',
    description: 'Kullanıcı Bilgi Komutu.',
    usage: 'kb'
  }