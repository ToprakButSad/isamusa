const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
exports.run = async(client, message, args) => {
const Revenge = new Discord.MessageEmbed()
.setColor('BLUE')
.setAuthor(message.author.tag,message.author.avatarURL({dynamic:true}))
.setDescription('**Kullanabileceğiniz komutlar;**')
.addField(`${ayarlar.prefix}partner`,'Partnerlik hakkında ayarlama vs. yaparsınız.')
.addField(`${ayarlar.prefix}ayarlar`,'Sunucu ayarlarına bakarsınız.')
.addField(`${ayarlar.prefix}top`,'En çok partnerlik yapanları görürsünüz.')
.addField(`${ayarlar.prefix}url`,'Sunucunuza url alırsınız.')
.addField(`${ayarlar.prefix}bal`,'Coin bütçenize bakarsınız.')
.addField(`${ayarlar.prefix}pay`,'Başkasına coin gönderirisiniz.')
.addField(`${ayarlar.prefix}istatistik`,'Botun istatistiklerine bakarsınız.')
.addField(`${ayarlar.prefix}sunucu-bilgi`,'Sunucunun istatistiklerine bakarsınız.')
.addField(`${ayarlar.prefix}partner-bul`,'Partneri açık olan sunucuları listeler.')
.addField(`${ayarlar.prefix}davet`,'Botu davet etmenize yarar.')
.addField(`${ayarlar.prefix}kullanıcı-bilgi`,'Kullanıcı bilginize bakarsınız.')
.addField(`${ayarlar.prefix}günlük-hediye`,'Oy vererek 1-7 arasında coin kazanırsınız.')

.addField('📥 Linkler',`
[Davet et!](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8) | [Destek sunucusu](${ayarlar.destek})
`)
.setThumbnail(client.user.avatarURL())
.setFooter(message.guild.name,message.guild.iconURL({dynamic:true}))
.setTimestamp()
//.setImage("https://cdn.discordapp.com/attachments/810109577667411978/815871013485019146/DuuTh-MW4AIFRVq.png")
message.channel.send(Revenge)
}
module.exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['yardım','help'],
    permLevel: 0
}

exports.help = {
    name: 'Yardım',
    description: 'Yardım Komutu.',
    usage: 'y'
}