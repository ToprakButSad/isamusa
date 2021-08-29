const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const ms = require('parse-ms')
const moment = require('moment')
require('moment-duration-format')

exports.run = async (client, message, args) => {
const Sistem = db.fetch(`Sistem_${message.guild.id}`)
const PartnerSorumlusu = db.fetch(`PartnerSorumlusu_${message.guild.id}`)
const PartnerText = db.fetch(`PartnerText_${message.guild.id}`)
const PartnerKanal = db.fetch(`PartnerKanal_${message.guild.id}`)
const PartnerLog = db.fetch(`PartnerLogKanal_${message.guild.id}`)
const PartnerURL = db.fetch(`URL_${message.guild.id}`)
const PartnerŞart2 = db.fetch(`PBPartnerŞart_${message.guild.id}`)
const PartnerŞart = db.fetch(`PartnerŞart_${message.guild.id}`)
const PartnerPremium = db.fetch(`PremiumSunucuBilgi_${message.guild.id}`)
const Embed = new Discord.MessageEmbed()
.setFooter(message.guild.name,message.guild.iconURL({dynamic:true}))
.setThumbnail(message.guild.iconURL({dynamic:true,size:2048}))
.setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))

.addField('❓ - Sistem Açık Mı ?',Sistem ? `${client.onay} **| Evet
(\`${client.users.cache.get(Sistem.Ayarlayan).tag} tarafından ${Sistem.Tarih} tarihinde açılmış\`)**` : `${client.çarpı} **| Hayır**`)

.addField('👥 - Partner Sorumlusu Rolü',PartnerSorumlusu ? `${client.onay} **| <@&${message.guild.roles.cache.get(PartnerSorumlusu).id}> \`${message.guild.roles.cache.get(PartnerSorumlusu).name}\`**` : `${client.çarpı} **| Ayarlanmamış**`)

.addField('📜 - Partner Texti',PartnerText ? `${client.onay} **| Ayarlanmış
(\`${client.users.cache.get(PartnerText.Ayarlayan).tag} tarafından ${PartnerText.Tarih} tarihinde ayarlanmış\`)**` : `${client.çarpı} **| Ayarlanmamış**`)

.addField(`${client.emojis.cache.get('813730174235312208')} - Partner Kanalı`,PartnerKanal ? `${client.onay} **| <#${PartnerKanal.Kanal}>
(\`${client.users.cache.get(PartnerKanal.Ayarlayan).tag} tarafından ${PartnerKanal.Tarih} tarihinde ayarlanmış\`)**` : `${client.çarpı} **| Ayarlanmamış**`)

.addField(`📙 - Partner -Log- Kanalı`,PartnerLog ? `${client.onay} **| <#${PartnerLog.Kanal}>
(\`${client.users.cache.get(PartnerLog.Ayarlayan).tag} tarafından ${PartnerLog.Tarih} tarihinde ayarlanmış\`)**` : `${client.çarpı} **| Ayarlanmamış**`)

.addField(`${client.emojis.cache.get('816993588868677643')} - Partner Şart`,PartnerŞart ? `${client.onay} **| ${PartnerŞart.Üye}
(\`${client.users.cache.get(PartnerŞart.Ayarlayan).tag} tarafından ${PartnerŞart.Tarih} tarihinde ayarlanmış\`)**` : `${client.çarpı} **| Ayarlanmamış**`)

.addField(`🔗 - Özel URL`,PartnerURL ? `${client.onay} **| ${PartnerURL.URL}
(\`${client.users.cache.get(PartnerURL.Ayarlayan).tag} tarafından ${PartnerURL.Tarih} tarihinde ayarlanmış\`)**

Kalan Süre: **${ms(604800000 - (Date.now() - PartnerURL.Süre)).days}d, ${ms(604800000 - (Date.now() - PartnerURL.Süre)).hours}h, ${ms(604800000 - (Date.now() - PartnerURL.Süre)).minutes}m**` : `${client.çarpı} **| ${message.guild.id}**`)
.addField(`🟡 - Premium`,PartnerPremium ? `${client.onay} **| Premiuma sahip!
(\`${client.users.cache.get(PartnerPremium.Ayarlayan).tag} tarafından ${PartnerPremium.Tarih} tarihinde ayarlanmış\`)**

Kalan Süre: **${ms(604800000 - (Date.now() - PartnerPremium.Süre)).days}d ,${ms(604800000 - (Date.now() - PartnerPremium.Süre)).hours}h, ${ms(604800000 - (Date.now() - PartnerPremium.Süre)).minutes}m**` : `${client.çarpı} **| Premiuma sahip değil.**`)

.setColor('BLUE')
message.channel.send(Embed)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['ayarlar','sunucu-bilgi','sunucubilgi','sb'],
    permLevel: 0
  }
  
  exports.help = {
    name: 'Ayarlar Bilgisi',
    description: 'Sunucu Ayarları Bilgisi',
    usage: 'ayarlar'
  }