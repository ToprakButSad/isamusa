const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const moment = require('moment')
require('moment-duration-format')
moment.locale('tr')

exports.run = async (client, message, args) => {
if (!ayarlar.sahip.includes(message.author.id)) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Bu Komutu Kullanmak İçin \`Sahibim\` Olman Lazım!**`)).then(Hata => Hata.delete({timeout:7500}))
const Bakım = db.fetch('Bakım')
if (args[0] == 'çıkart') {
if (!Bakım) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| BOT zaten bakımda değil!**`)).then(Hata => Hata.delete({timeout:7500}))
message.channel.send(client.embed.setDescription(`❓ **| Botu bakımdan çıkartmak istediğinize emin misiniz ?**


  > Sebep: \`${Bakım.Sebep}\`
  > Bakıma Alan: \`${client.users.cache.get(Bakım.Alan).tag}\`
  > Bakıma Alınma Tarihi: \`${Bakım.Tarih}\`
`)).then(Mesaj => {
//  > Geçen Süre: \`${moment(new Date() - Bakım.Süre).format('Y [Yıl] M [Ay] d [Gün] h [Saat] m [Dakika] s [Saniye]').replace('-','')}\`
Mesaj.react(client.onay).then(async Tepki => {
const Onay = (reaction, user) => reaction.emoji.name == 'onay' && user.id === message.author.id
const Onay2 = Mesaj.createReactionCollector(Onay)
Onay2.on('collect', async(reaction) => {
Mesaj.reactions.removeAll()
Mesaj.edit(client.embed.setDescription(`${client.onay} **| BOT Bakımdan Çıkartıldı!**`))
db.delete('Bakım')
client.channels.cache.get('817077627222753320').send(client.embed.setDescription(`${client.onay} **| BOT \`${message.author.tag}\` kullanıcısı tarafından bakımdan çıkartıldı!**`))
})
await Mesaj.react(client.çarpı).then(() => {
const Onay = (reaction, user) => reaction.emoji.name == 'red' && user.id === message.author.id
const Onay2 = Mesaj.createReactionCollector(Onay)

Onay2.on('collect', async() => {
Mesaj.reactions.removeAll()
Mesaj.edit(client.embed.setDescription(`${client.çarpı} **| İstek iptal edildi!**`))
})
})
})
})
} else {
if (Bakım) return message.channel.send(client.embed.setDescription(`${client.onay} **| BOT zaten bakımda.**


  > Sebep: \`${Bakım.Sebep}\`
  > Bakıma Alan: \`${Bakım.Alan}\`
  > Bakıma Alınma Tarihi: \`${Bakım.Tarih}\`
`))
//  > Geçen Süre: \`${moment.duration(Bakım.Süre - message.createdAt).format('Y [Yıl] M [Ay] d [Gün]').replace('-','')}\`
const Sebep = args.slice(0).join(' ')
if (!Sebep) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Lütfen bir sebep giriniz!**`))
message.channel.send(client.embed.setDescription(`${client.onay} **| BOT \`${Sebep}\` sebebiyle bakıma alındı.**`))
db.set('Bakım',{Sebep:Sebep, Alan: message.author.id, Tarih: moment().format('LLL'), Süre: new Date()})
client.channels.cache.get('817077627222753320').send(client.embed.setDescription(`${client.onay} **| BOT bakıma alındı.**


  > Sebep: \`${Sebep}\`
  > Bakıma Alan: \`${message.author.tag}\`
  > Bakıma Alınma Tarihi: \`${moment().format('LLL')}\`
`))
}
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['bakım'],
    permLevel: 0
  }
  
  exports.help = {
    name: 'Bakım',
    description: 'Botuma Bakıma Alır.',
    usage: 'bakım'
  }