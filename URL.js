const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const moment = require('moment')
require('moment-duration-format')
exports.run = async (client, message, args) => {
const Balance = db.fetch(`Coins_${message.author.id}`) || '0'
const Seçenek = args[0]
if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Hata! Bu komutu kullanabilmek için \`Sunucuyu Yönet\` yetkisine ihtiyacınız var.**`)).then(Hata => Hata.delete({timeout:7500}))
if (Seçenek == 'al') {
if (Balance < 80) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Özel bir URL almak için \`80\` Coine ihtiyacınız var. Bilgi almak için [tıkla.](${ayarlar.destek})**`)).then(Hata => Hata.delete({timeout:15000}))
const URL = args[1]
if (!URL) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Lütfen bir url belirtiniz.**`)).then(Hata => Hata.delete({timeout:15000}))
const Yasaklılar = ['allah','peygamber','oç','yarrak','am','amcık','piç','sik','sikik','tanrı','allahım','allahınız']
if (Yasaklılar.includes(URL.slice('').toLowerCase())) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Üzgünüz! URL kurallarına uymayan bir url girdiniz.**`)).then(Hata => Hata.delete({timeout:15000}))
if (db.has(URL.toLowerCase())) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Bu URL daha önceden alınmış.**`)).then(Hata => Hata.delete({timeout:15000}))
if (db.has(`URL_${message.guild.id}`)) return message.channel.send(client.embed2.setDescription(`${client.çarpı} **| Bu sunucu zaten bir urlye sahip. Önce urlyi sıfırlayın.**`)).then(Hata => Hata.delete({timeout:15000}))
message.channel.send(client.embed2.setDescription(`${client.onay} **| Artık sunucu URL niz \`${URL}\` olarak ayarlandı! (-80 Coin)**

Urlnin kalan süresi: **6d 23h 59m**`))
db.add(`Coins_${message.author.id}`,-80)
db.set(URL.toLowerCase(),`${message.guild.id}`)
db.set(`URL_${message.guild.id}`,{URL:URL.toLowerCase(), Ayarlayan: message.author.id, Tarih: moment().format('LLL'), Süre: Date.now()})
db.set(`URL_${message.guild.id}_Süre`, Date.now())
db.push(`Log_${message.author.id}`,`Özel URL Alındı | 80 Coin`)
db.set(`PBURL_${message.guild.id}`,URL.toLowerCase())
} else {
if (Seçenek == 'sıfırla') {
if (!db.fetch(`URL_${message.guild.id}`)) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Zaten özel urlniz yok.**`)).then(Hata => Hata.delete({timeout:15000}))
message.channel.send(client.embed.setDescription(`${client.onay} **| Sunucu URL si sıfırlandı.**`))
db.delete(db.fetch(`URL_${message.guild.id}`).URL)
db.delete(`URL_${message.guild.id}`)
db.delete(`PBURL_${message.guild.id}`)
} else return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Lütfen bir seçenek belirtiniz. \`(al | sıfırla)\`**`)).then(Hata => Hata.delete({timeout:15000}))
}
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['url'],
    permLevel: 0
  }

  exports.help = {
    name: 'URL Alma - Silme',
    description: 'URL Alma Komutu.',
    usage: 'url'
  }