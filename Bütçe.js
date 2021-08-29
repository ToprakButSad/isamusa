const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const moment = require('moment')
require('moment-duration-format')
const Tarih = new Date()
exports.run = async(client, message, args) => {
let Geçmişş;
let GeçmişMesaj;
const Geçmiş = db.fetch(`Log_${message.author.id}`)

if (!Geçmiş) {
const Türkçe = new Discord.MessageEmbed()
.setColor('#8a8aff')
.setAuthor(`${message.member.displayName}'nin ${client.user.username} Coins Bütçesi`, message.author.avatarURL({dynamic:true}))
.setTitle(`Coin Bütçesi: ${await db.fetch(`Coins_${message.author.id}`) || '0'} Coins!`)
.addField('**Ekleme Geçmişi**',`\`Hiç Geçmişi Yok.\``)
.setFooter(`(©) ${Tarih.getFullYear()} ${client.user.username} | ${ayarlar.destek}`)
message.channel.send(Türkçe)
} else {
const RGeçmiş = Geçmiş.reverse()
Geçmiş.length = 10
const Türkçe = new Discord.MessageEmbed()
.setColor('#8a8aff')
.setAuthor(`${message.member.displayName}'nin ${client.user.username} Coins Bütçesi`, message.author.avatarURL({dynamic:true}))
.setTitle(`Coin Bütçesi: ${await db.fetch(`Coins_${message.author.id}`) || '0'} Coins!`)
.addField('**Ekleme Geçmişi**',`\`${RGeçmiş.join('\n')}\``)
.setFooter(`(©) ${Tarih.getFullYear()} ${client.user.username} | ${ayarlar.destek}`)
message.channel.send(Türkçe)

}
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['bal','bakiye','balance'],
  permLevel: 0
}

exports.help = {
  name: 'Balance',
  description: 'Kullanıcının Para Miktarını Gösterir',
  usage: 'bal'
}