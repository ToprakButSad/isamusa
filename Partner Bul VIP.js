const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const moment = require('moment')
require('moment-duration-format')
moment.locale('tr')
exports.run = async (client, message, args) => {
//if(!ayarlar.sahip.includes(message.author.id)) return message.channel.send(client.embed.setDescription('Botun Embed Sınırı Dolduğu İçin Kısa Süreli Bakımda. [Destek]('+ayarlar.destek+')')).then(Hata => Hata.delete({timeout:15000}))

if (!db.fetch(`PartnerSorumlusu_${message.guild.id}`)) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Sunucuda Partner Sorumlusu rolü aktif değil. 

\`${client.ayarlar.prefix}partner sorumlusu @Partner Sorumlusu\`**`)).then(Hata => Hata.delete({timeout:45000}))
if (!db.fetch(`PartnerText_${message.guild.id}`)) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Sunucuda Partner Text ayarlı değil. 

\`${client.ayarlar.prefix}partner text <Text>\`**`)).then(Hata => Hata.delete({timeout:45000}))
if (!db.fetch(`Sistem_${message.guild.id}`)) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Sunucuda sistem aktif değil. 

\`${client.ayarlar.prefix}partner aç\`**`)).then(Hata => Hata.delete({timeout:45000}))
if (!db.fetch(`PartnerKanal_${message.guild.id}`)) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Sunucuda partner kanalı ayarlı değil. 

\`${client.ayarlar.prefix}partner kanal #partner\`**`)).then(Hata => Hata.delete({timeout:45000}))
if (!message.member.roles.cache.has(db.fetch(`PartnerSorumlusu_${message.guild.id}`))) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Bu komutu kullanabilmek için \`${message.guild.roles.cache.get(db.fetch(`PartnerSorumlusu_${message.guild.id}`)).name}\` rolüne sahip olman gerekli.**`)).then(Hata => Hata.delete({timeout:15000}))  

  const Embbed = new Discord.MessageEmbed()
  .setColor('BLUE')
  .setAuthor(message.author.tag,message.author.avatarURL({dynamic:true}))
  .setFooter(client.user.username,client.user.avatarURL())
  .setTimestamp()
  const Embed = new Discord.MessageEmbed()
  .setColor('BLUE')
  .setAuthor(message.author.tag,message.author.avatarURL({dynamic:true}))
  .setFooter(client.user.username,client.user.avatarURL())
  .setTimestamp()
  const Embed2 = new Discord.MessageEmbed()
  .setColor('BLUE')
  .setAuthor(message.author.tag,message.author.avatarURL({dynamic:true}))
  .setFooter(client.user.username,client.user.avatarURL())
  .setTimestamp()
  
  const Arr = []
  const Arr2 = []
  const Arr3 = []
  client.guilds.cache.sort((a,b) => a.memberCount - b.memberCount).array().filter(Sunucu => {
  if(db.has(`Sistem_${Sunucu.id}`) && db.has(`PartnerKanal_${Sunucu.id}`) && db.has(`PartnerSorumlusu_${Sunucu.id}`) && db.has(`PartnerText_${Sunucu.id}`) && db.has(`PremiumSunucu_${Sunucu.id}`)) {
  Arr.push(Sunucu.id)
  Arr2.push(Sunucu.id)
  }
  })
  if (Arr.length <= 0) return message.channel.send(client.embed2.setDescription(`${client.çarpı} **| Uygun sunucu bulunamadı.**`))
  Arr2.slice(0,1).map(ArrGuild => {
/*  Embbed.addField(`${client.guilds.cache.get(ArrGuild).name}・${client.guilds.cache.get(ArrGuild).memberCount} Üye`,`
  > Kurucusu: <@${client.guilds.cache.get(ArrGuild).ownerID}> (${client.users.cache.get(client.guilds.cache.get(ArrGuild).ownerID).tag})
  > Oluşturulma: ${moment(client.guilds.cache.get(ArrGuild).createdAt).format('LLL')}
  > URL: ${db.fetch(`PBURL_${ArrGuild}`) || client.guilds.cache.get(ArrGuild).id}
  > Partner Sayısı: ${db.fetch(`PC_${client.guilds.cache.get(ArrGuild).id}`) || 0}`)*/
  })
 // message.channel.send(Embbed)
var Page = 0
  
const SunucuArray =  client.guilds.cache.sort((a,b) => a.memberCount - b.memberCount).array().filter(Sunucu => {
  if(db.has(`Sistem_${Sunucu.id}`) && db.has(`PartnerKanal_${Sunucu.id}`) && db.has(`PartnerSorumlusu_${Sunucu.id}`) && db.has(`PartnerText_${Sunucu.id}`) && db.has(`PartnerLogKanal_${Sunucu.id}`) && db.has(`PremiumSunucu_${Sunucu.id}`)) {
  }
  })

for(let i = 0; Number(i + '0') < (Math.round(SunucuArray.length/10)*10); ++i) {
Arr.push(SunucuArray.toString())
}
			  let FinalCONTENT3 = ""
			  for (var i = 0; i <= 0; i++) {
				  FinalCONTENT3 += `**${client.guilds.cache.get(Arr[Page+i]).name}・${client.guilds.cache.get(Arr[Page+i]).memberCount} Üye**
			  
  > Kurucusu: <@${client.guilds.cache.get(Arr[Page+i]).ownerID}> (${client.users.cache.get(client.guilds.cache.get(Arr[Page+i]).ownerID).tag})
  > Oluşturulma: ${moment(client.guilds.cache.get(Arr[Page+i]).createdAt).format('LLL')}
  > URL: ${db.fetch(`PBURL_${Arr[Page+i]}`) || client.guilds.cache.get(Arr[Page+i]).id}
  > Partner Sayısı: ${db.fetch(`PC_${client.guilds.cache.get(Arr[Page+i]).id}`) || 0}
  > Son Partner Yapılma: \`${moment(db.fetch(`PartnerTopSaat_${Arr[Page+i]}`)).startOf('minutes').fromNow().replace('Invalid date','Bilinmiyor')}\`
  > Partner Şartı: **${db.fetch(`PBPartnerŞart_${Arr[Page+i]}`) || 0}**\n`
			  }

message.channel.send(Embbed.setDescription(FinalCONTENT3 || 'Hata').setFooter(`Sayfa ${Page+1} / ${Arr.length}`,client.user.avatarURL())).then(async Message => {
      await Message.react('⬅️')
      await Message.react('➡️')

      const filter = (reaction, user) => user.id !== message.client.user.id && user.id === message.author.id

      const collector = Message.createReactionCollector(filter, {time: 120000})

      collector.on('collect', async (reaction, user) => {
        switch (reaction.emoji.name) {
          case '⬅️':
            reaction.users.remove(user)
            if (Page == 0) return
            --Page
              Embed.setFooter(`Sayfa ${Page+1} / ${Arr.length}`,client.user.avatarURL())
			  let FinalCONTENT = ""
			  for (var i = 0; i <= 0; i++) {
				  FinalCONTENT += `**${client.guilds.cache.get(Arr[Page+i]).name}・${client.guilds.cache.get(Arr[Page+i]).memberCount} Üye**
			  
  > Kurucusu: <@${client.guilds.cache.get(Arr[Page+i]).ownerID}> (${client.users.cache.get(client.guilds.cache.get(Arr[Page+i]).ownerID).tag})
  > Oluşturulma: ${moment(client.guilds.cache.get(Arr[Page+i]).createdAt).format('LLL')}
  > URL: ${db.fetch(`PBURL_${Arr[Page+i]}`) || client.guilds.cache.get(Arr[Page+i]).id}
  > Partner Sayısı: ${db.fetch(`PC_${client.guilds.cache.get(Arr[Page+i]).id}`) || 0}
  > Son Partner Yapılma: \`${moment(db.fetch(`PartnerTopSaat_${Arr[Page+i]}`)).startOf('minutes').fromNow().replace('Invalid date','Bilinmiyor')}\`
  > Partner Şartı: **${db.fetch(`PBPartnerŞart_${Arr[Page+i]}`) || 0}**\n`
				  
			  }
              Embed.setDescription(FinalCONTENT || 'Geçersiz Hata.')
            Message.edit(Embed)
           break
          case '➡️':
            if (Page == Arr.length) return
            ++Page
            reaction.users.remove(user)
              Embed.setFooter(`Sayfa ${Page+1} / ${Arr.length}`,client.user.avatarURL())
			  let FinalCONTENT2 = ""
			  for (var i = 0; i <= 0; i++) {
				  FinalCONTENT2 += `**${client.guilds.cache.get(Arr[Page+i]).name}・${client.guilds.cache.get(Arr[Page+i]).memberCount} Üye**
			  
  > Kurucusu: <@${client.guilds.cache.get(Arr[Page+i]).ownerID}> (${client.users.cache.get(client.guilds.cache.get(Arr[Page+i]).ownerID).tag})
  > Oluşturulma: ${moment(client.guilds.cache.get(Arr[Page+i]).createdAt).format('LLL')}
  > URL: ${db.fetch(`PBURL_${Arr[Page+i]}`) || client.guilds.cache.get(Arr[Page+i]).id}
  > Partner Sayısı: ${db.fetch(`PC_${client.guilds.cache.get(Arr[Page+i]).id}`) || 0}
  > Son Partner Yapılma: \`${moment(db.fetch(`PartnerTopSaat_${Arr[Page+i]}`)).startOf('minutes').fromNow().replace('Invalid date','Bilinmiyor')}\`
  > Partner Şartı: **${db.fetch(`PBPartnerŞart_${Arr[Page+i]}`) || 0}**\n`
				  
			  }
              Embed.setDescription(FinalCONTENT2 || 'Geçersiz Hata.')
            Message.edit(Embed)
          break

        }
      })


})
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['partner-bul-vip','pbv','partnerbulvip','partnerlik-vip-sunucular','partnerliksunucularvip'],
    permLevel: 0
  }
  
  exports.help = {
    name: 'Partner Bul VIP',
    description: 'VIP Partner Bulursunuz.',
    usage: 'pbv'
  }