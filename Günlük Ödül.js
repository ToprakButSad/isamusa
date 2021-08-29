const Discord = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms')
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message,args) => {
if (message.guild.id !== '813459382096232528') return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Bu komutu sadece [destek](${ayarlar.destek}) sunucusunda oy verdikten sonra kullanabilirsin.**`)).then(Hata => Hata.delete({timeout:10000}))
if (!message.member.roles.cache.has('816980801560248401')) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Bu komutu sadece destek sunucusunda [oy verdikten](https://botsfordiscord.com/bot/${client.user.id}/vote) sonra kullanabilirsin.**`)).then(Hata => Hata.delete({timeout:10000}))
const Premium = message.member.roles.cache.find(Rol => Rol.id == '822767014317654044')
const Süre = db.fetch(`GünlükÖdül_${message.author.id}`)
let Saat;
if (!Premium) Saat = 43200000
if (Premium) Saat = 21600000
if(Süre !== null && Saat - (Date.now() - Süre) > 0) {
const Time = ms(Saat - (Date.now() - Süre))

message.channel.send(client.embed.setDescription(`⏱️ **|** Dur! **${message.author.username}**! Günlük ödülünü tekrar alabilmek için **${Time.hours} saat, ${Time.minutes} dakika, ${Time.seconds} saniye** bekle!`)).then(Hata => Hata.delete({timeout:10000})) // **${Time.hours}H ${Time.minutes}M ${Time.seconds}S**
} else {
db.set(`GünlükÖdül_${message.author.id}`, Date.now())
message.channel.send(client.embed.setDescription('🙄 **| Çark Çeviriliyor..**').setThumbnail('https://media2.giphy.com/media/26uflBhaGt5lQsaCA/giphy.gif')).then(Emb => {
let Sayılar;
if (!Premium) Sayılar = [1,2,3,4,5,6,7]
if (Premium) Sayılar = [6,7,8,9,10,11,12,13,14]
const Random = Sayılar[Math.floor(Math.random() * Sayılar.length)]
setTimeout(() => {
Emb.delete()
message.channel.send(`
💰 **| ${message.author.username}**, İşte günlük hediyen **${client.emojis.cache.get('820213385584050196')} ${Random} Coin**!
⏱️ **|** Gelecek günlük ödülün: 15H 59M 59S`)
db.add(`Coins_${message.author.id}`,Random)
db.push(`Log_${message.author.id}`,`${Random} Coin Eklendi. Sebep: Oy Verme`)
}, 5000)
})
}
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['günlük-ödül','günlüködül','gö','günlük-hediye','günlükhediye'],
  permLevel: 0
}

exports.help = {
  name: 'Günlük Ödül',
  description: 'Günlük Ödülünüzü Alırsınız.',
  usage: 'gö'
}