const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
module.exports = (client) => {
if (db.fetch('Kabul') == null) db.set('Kabul',1),console.log('Kabul Sayısı Olmadığı İçin 1 Olarak Ayarlandı')

//  WATCHING  : !ping izliyor
//  LISTENING : !ping dinliyor
//  PLAYING   : !ping oynuyor 
//  STREAMING : !ping yayında
setInterval(() => {
const Oyunlar = [
`${ayarlar.prefix}ayarlar`,
`${ayarlar.prefix}yardım | ${ayarlar.prefix}help`,
`${client.guilds.cache.size.toLocaleString()} Sunucu | ${client.guilds.cache.reduce((Molarka,UP) => Molarka + UP.memberCount,0).toLocaleString()} Kullanıcı`,
'Partnerlik Yapanlarla',
`🆕 ${ayarlar.prefix}partner-bul`,
`🆕 ${ayarlar.prefix}sunucu-bilgi`,
`🆕 ${ayarlar.prefix}istatistik`,
`🆕 ${ayarlar.prefix}top-partner`,
`🆕 ${ayarlar.prefix}top`,
`🆕 ${ayarlar.prefix}partner-bul Aktif!`,
`🆕 ${ayarlar.destek}`,
`🆕 ${ayarlar.prefix}partner log ayarla`,
`🆕 ${ayarlar.prefix}partner şart ayarla`
]
const Oynuyor = Oyunlar[Math.floor(Math.random() * Oyunlar.length)]
client.user.setActivity(Oynuyor,{ type: 'PLAYING', url: 'https://twitch.tv/'})
},7500)
//client.user.setActivity('BOT Bakımda',{ type: 'WATCHING'})
client.user.setStatus('idle')
console.log(`${client.user.username} Aktif! [${client.guilds.cache.size} Sunucu, ${client.guilds.cache.reduce((Revenge,NYKS) => Revenge + NYKS.memberCount, 0).toLocaleString()} Kullanıcı]`)
}