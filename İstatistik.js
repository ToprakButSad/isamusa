const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
const moment = require('moment')
require('moment-duration-format')
exports.run = async(client, message, args) => {
message.channel.send(client.embed2.setDescription('⌛ **| Lütfen bekleyin, veriler alınıyor.**')).then(Mesaj => {
setTimeout(() => {
	const Duration = moment.duration(client.uptime).format('D [Gün], H [Saat], m [Dakika], s [Saniye]')
    const Embed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle(`${client.user.username} Istatistikleri`)
    .setThumbnail(client.user.avatarURL())
    .addField(`» ${client.emojis.cache.get('817694098650562572')} Bellek Kullanımı`, (process.memoryUsage().rss / 4096 / 4096).toFixed(2) + ' MB / 4096 MB')
    .addField(`» ${client.emojis.cache.get('817694609412063233')} Sunucu Sayısı`, client.guilds.cache.size)
    .addField(`» ${client.emojis.cache.get('817705049488359445')} Kullanıcı Sayısı`, client.guilds.cache.reduce((Dark,Partner) => Dark + Partner.memberCount,0).toLocaleString())
    .addField(`» ${client.emojis.cache.get('817705428485799957')} Shard`, '2') 
    .addField(`» ${client.emojis.cache.get('817695045410750475')} Aktiflik`, Duration)
	.addField(`» ${client.emojis.cache.get('817707702750937108')} Sistemin Açık Olduğu Sunucular`, client.guilds.cache.filter(Server => db.has(`Sistem_${Server.id}`)).size || '0')
    .addField(`» ${client.emojis.cache.get('817714509229195315')} Toplam Partner Yapılma`,db.fetch('BOTPartner').toLocaleString())
	.addField(`» 🥇 Toplam Premium Sayısı`,client.guilds.cache.filter(Server => db.has(`PremiumSunucu_${Server.id}`)).size || '0')

	Mesaj.edit(Embed)
},5000)
})


}
module.exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['stat','i','istatistik'],
    permLevel: 0
}

exports.help = {
    name: 'İstatistik',
    description: 'İstatistik Komutu.',
    usage: 'i'
}