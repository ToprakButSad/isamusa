const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const http = require('http')
const express = require('express')
const ayarlar = require('./ayarlar.json')
const app = express()
const ms = require('ms')
const ms2 = require('parse-ms')
const db = require('quick.db')
const moment = require('moment')
require('moment-duration-format')
moment.locale('tr')
const Peppe = message => {
  console.log(`${message}`)
}
require('./util/eventLoader.js')(client)

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
fs.readdir('./komutlar/', (Error, Files) => {
    if (Error) console.error(Error)
    Peppe(`${Files.length} Komut Yüklenecek!`)
    Files.forEach(Pepe => {
        let Props = require(`./komutlar/${Pepe}`)
        Peppe(`Yüklenen Komut » ${Props.help.name}.`)
        client.commands.set(Props.help.name, Props)
        Props.conf.aliases.forEach(Alias => {
        client.aliases.set(Alias, Props.help.name)
})})})

client.reload = command => {
 return new Promise((Resolve, Reject) => {
 try {
 delete require.cache[require.resolve(`./komutlar/${command}`)]
 let CMD = require(`./komutlar/${command}`)
 client.commands.delete(command)
 client.aliases.forEach((CMD, Alias) => {
 if (CMD === command) client.aliases.delete(Alias)
 })
 client.commands.set(command, CMD)
 CMD.conf.aliases.forEach(Alias => {
 client.aliases.set(Alias, CMD.help.name)
 })
 Resolve()
 } catch (Hata) {
 Reject(Hata)
}})}

client.load = command => {
 return new Promise((Resolve, Reject) => {
 try {
 let CMD = require(`./komutlar/${command}`)
client.commands.set(command, CMD)
CMD.conf.aliases.forEach(Alias => {
client.aliases.set(Alias, CMD.help.name)
})
Resolve()
} catch (Hata) {
Reject(Hata)
}})}

client.unload = command => {
 return new Promise((Resolve, Reject) => {
 try {
 delete require.cache[require.resolve(`./komutlar/${command}`)]
 let CMD = require(`./komutlar/${command}`)
 client.commands.delete(command)
 client.aliases.forEach((CMD, Alias) => {
 if (CMD === command) client.aliases.delete(Alias)
 })
 Resolve()
 } catch (Hata) {
 Reject(Hata)
}})}
// Pepe Code
client.on('message', async message => {
client.ayarlar = {
'prefix': db.fetch(`Prefix_${message.author.id}`) || ayarlar.prefix,
'dil': db.fetch(`Dil_${message.author.id}`)
}
client.çarpı = client.emojis.cache.get('806579000565694484')
client.onay = client.emojis.cache.get('812091473204871279')
})

client.on('guildCreate', guild => {
client.channels.cache.get('816981348916789288').send(new Discord.MessageEmbed().setColor('BLUE').setAuthor(guild.name,guild.iconURL({dynamic:true}))
.setThumbnail(guild.iconURL({dynamic:true}))
.setTitle(`» ${client.user.username} Eklendi!`)
.addField('» Sunucu Adı',`» ${guild.name}`,true)
.addField('» Sunucu Sahibi',`» ${client.users.cache.get(guild.ownerID).tag}`,true)
.addField('» Sunucu Kurulum',`» ${moment(guild.createdAt).format('LL')}`)
.addField('» Sunucudaki Üye Sayısı',`» ${guild.memberCount}`)
.addField('» Sunucu ID',`» ${guild.id}`,true)
.addField('\u200b','\u200b')
.addField('» Artık İstatistik',`» ${client.guilds.cache.reduce((a,b) => a+b.memberCount,0).toLocaleString()} Kullanıcı, ${client.guilds.cache.size} Sunucu`)
)
if(db.has(`KaraListe_${guild.ownerID}`)) return guild.leave()
db.set(guild.id,guild.id)
})

client.on('guildDelete', guild => {
client.channels.cache.get('816981348916789288').send(new Discord.MessageEmbed().setAuthor(guild.name,guild.iconURL({dynamic:true}))
.setThumbnail(guild.iconURL({dynamic:true}))
.setTitle(`» ${client.user.username} Atıldı!`)
.setColor('RED')
.addField('» Sunucu Adı',`» ${guild.name}`,true)
.addField('» Sunucu Sahibi',`» ${client.users.cache.get(guild.ownerID).tag}`,true)
.addField('» Sunucu Kurulum',`» ${moment(guild.createdAt).format('LL')}`)
.addField('» Sunucudaki Üye Sayısı',`» ${guild.memberCount}`)
.addField('» Sunucu ID',`» ${guild.id}`,true)
.addField('\u200b','\u200b')
.addField('» Artık İstatistik',`» ${client.guilds.cache.reduce((a,b) => a+b.memberCount,0).toLocaleString()} Kullanıcı, ${client.guilds.cache.size} Sunucu`)
)
db.delete(`Sistem_${guild.id}`)
db.delete(`PartnerSorumlusu_${guild.id}`)
db.delete(`PartnerText_${guild.id}`)
db.delete(`PartnerKanal_${guild.id}`)
db.delete(guild.id)
})

client.on('ready', () => {
client.channels.cache.get('816983626477731860').messages.fetch({around: '817000306503450644', limit: 1}).then(async REmbed => {
const Embed = REmbed.first()
Embed.reactions.removeAll().then(() => {
Embed.react('816993346983297065')
})
})
setInterval(async () => {
client.guilds.cache.forEach(async Server => {
const Saat = 604800000 // 604800000 // 30000
const Data = db.fetch(`URL_${Server.id}_Süre`)
const Data2 = db.fetch(`PremiumSunucuBilgiSüre_${Server.id}`)
if (!Data) return;
if (Saat - (Date.now() - Data) < 0) {
await client.channels.cache.get('821408562701402213').send(new Discord.MessageEmbed().setColor('BLUE').setDescription(`${client.onay} **| ${client.guilds.cache.get(Server.id).name} Sunucusundaki \`${db.fetch(`URL_${Server.id}`).URL}\` Urlsi Sıfırlandı.**`))
db.delete(db.fetch(`PBURL_${Server.id}`))
db.delete(`URL_${Server.id}`)
db.delete(`URL_${Server.id}_Süre`)
db.delete(`PBURL_${Server.id}`)
db.set(Server.id,Server.id)
}
if (!Data2) return;
//Saat - (Date.now() - Data2)
if (604800000 - (Date.now() - Data2) < 0) {
client.guilds.cache.get('813459382096232528').users.cache.find(User => User.id == db.fetch(`PremiumSunucuBilgi_${Server.id}`).Ayarlayan).roles.remove('822767014317654044')
client.channels.cache.get('821408562701402213').send(new Discord.MessageEmbed().setColor('BLUE').setDescription(`${client.onay} **| ${client.guilds.cache.get(Server.id).name} Sunucusundaki \`Premium\` Sıfırlandı.**`))
db.delete(`PremiumSunucuBilgi_${Server.id}`)
db.delete(`PremiumSunucu_${Server.id}`)
db.delete(`PremiumSunucuBilgiSüre_${Server.id}`)
db.delete(`PremiumAldı_${db.fetch(`PremiumSunucuBilgi_${Server.id}`).Ayarlayan}`)
}
})
client.channels.cache.get('822393907740409869').edit({name: `🧄 Aktiflik・${moment.duration(client.uptime).format('D [Gün], H [Saat], m [Dakika], s [Saniye]')}`})
client.channels.cache.get('822393962958553139').edit({name: `🔢 Partner・${db.fetch('BOTPartner').toLocaleString()}`})
client.channels.cache.get('822394660718772224').edit({name: `📚 Sunucu・${client.guilds.cache.size.toLocaleString()}`})
client.channels.cache.get('822394689641644052').edit({name: `👥 Kullanıcı・${client.guilds.cache.reduce((a,b) => a + b.memberCount,0).toLocaleString()}`})
},7500)
})
const events = {
  MESSAGE_REACTION_ADD: 'messageReactionAdd',
  MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
}
client.on('raw', async event => {
  if (!events.hasOwnProperty(event.t)) return
  const { d: data } = event
  const anto = client.users.cache.get(data.user_id)
  const channel = client.channels.cache.get(data.channel_id) || await anto.createDM()
  if (channel.messages.cache.has(data.message_id)) return
  const message = await channel.messages.fetch(data.message_id)
  const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name
  const reaction = message.reactions.cache.get(emojiKey)
  client.emit(events[event.t], reaction, anto)
})

client.on('messageDelete',async message => {
const DataInfo = db.fetch(`BasitInfo_${message.id}`)
// const DataInfo2 = db.fetch(`BasıtInfo2_${message.id}`)
if (!DataInfo) return;
db.add(`Coins_${DataInfo.KabulEden}`,-5)
db.push(`Log_${DataInfo.KabulEden}`,`5 Coin Silindi. Sebep: Partner Text Silme`)
client.channels.cache.get(DataInfo.SilmeKanal).messages.fetch({around: db.fetch(`PartnerMesaj_${DataInfo.ReacGuild}_${DataInfo.Sunucu}`), limit:1}).then(async RPartnerM => {
const PartnerM = RPartnerM.first()
PartnerM.delete({reason:'Karşı taraf partnerliği bozdu.'})
})
client.channels.cache.get(db.fetch(`PartnerKanal_${DataInfo.ReacGuild}`).Kanal).messages.fetch({around: db.fetch(`PartnerMesaj_${DataInfo.Sunucu}_${DataInfo.ReacGuild}`), limit:1}).then(async PartnerM2 => {
const RPartnerM2 = PartnerM2.first()
RPartnerM2.delete({reason:'Karşı taraf partnerliği bozdu.'})
})

})
	
client.on('messageReactionAdd', async (reaction, user, message, channel) => {
const Dataa = db.fetch(`Info_${reaction.message.id}`)
if (!Dataa) return;
const PLog = db.fetch(`PartnerLogKanal_${reaction.message.guild.id}`).Kanal
const PLog2 = db.fetch(`PartnerLogKanal_${Dataa.Başvuran}`).Kanal
if (reaction.emoji.name == 'onay' && user.id !== client.user.id) {
reaction.users.remove(user.id)
if (!client.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id).roles.cache.has(db.fetch(`PartnerSorumlusu_${reaction.message.guild.id}`))) return reaction.message.channel.send(`<@${user.id}>, Partner isteğini kabul edebilmen için \`${client.guilds.cache.get(reaction.message.guild.id).roles.cache.find(Roller => Roller.id === db.fetch(`PartnerSorumlusu_${reaction.message.guild.id}`)).name}\` yetkisine sahip olman gerek.`).then(Hata => Hata.delete({timeout:7500}))
db.delete(`Durum_${reaction.message.guild.id}_${Dataa.Başvuran}`)
db.delete(`${Dataa.Başvuran}_${reaction.message.guild.id}`)
db.delete(`Info_${reaction.message.id}`)
reaction.message.delete()
client.channels.cache.get('822768864936722462').edit({name: `・${client.guilds.cache.get(reaction.message.guild.id).name}`})
client.channels.cache.get(db.fetch(`PartnerKanal_${reaction.message.guild.id}`).Kanal).send(`
> **__${client.user.username} Partnerlik Sistemi__**
    
${db.fetch(`PartnerText_${Dataa.Başvuran}`).Text}
    
> Partnerlik Yapan: <@${user.id}> (${db.fetch(`PartnerCount_${reaction.message.guild.id}_${user.id}`) || 0})
`).then(Messaj => {
db.set(`PartnerMesaj_${Dataa.Başvuran}_${reaction.message.guild.id}`,Messaj.id)
db.set(`BasitInfo_${Messaj.id}`,{KabulEden: user.id, Sunucu: Dataa.Başvuran, SilmeKanal: db.fetch(`PartnerKanal_${Dataa.Başvuran}`).Kanal, ReacGuild: reaction.message.guild.id})
//db.set(`BasitInfo2_${reaction.message.guild.id}`,{Sunucu: Dataa.Başvuran, Mesaj: Messaj.id})
})

client.channels.cache.get(db.fetch(`PartnerKanal_${Dataa.Başvuran}`).Kanal).send(`
> **__${client.user.username} Partnerlik Sistemi__**

${db.fetch(`PartnerText_${reaction.message.guild.id}`).Text}

> Partnerlik Yapan: <@${Dataa.Adam}> (${db.fetch(`PartnerCount_${Dataa.Başvuran}_${Dataa.Adam}`) || 0})
`).then(Message => {
db.set(`PartnerMesaj_${reaction.message.guild.id}_${Dataa.Başvuran}`,Message.id)
})

client.channels.cache.get(PLog).send(client.embed2.setDescription(`${client.onay} **| \`${client.guilds.cache.get(Dataa.Başvuran).name}\` adlı sunucu ile partnerlik yapıldı.**

> Partnerlik Yapan: <@${user.id}> (${db.fetch(`PartnerCount_${reaction.message.guild.id}_${user.id}`) || 0})`))
client.channels.cache.get(PLog2).send(client.embed2.setDescription(`${client.onay} **| \`${client.guilds.cache.get(reaction.message.guild.id).name}\` adlı sunucu ile partnerlik yapıldı.**

> Partnerlik Yapan: <@${Dataa.Adam}> (${db.fetch(`PartnerCount_${Dataa.Başvuran}_${Dataa.Adam}`) || 0})`))
db.set(`PartnerTopSaat_${Dataa.Başvuran}`,new Date())
db.set(`PartnerTopSaat_${reaction.message.guild.id}`,new Date())
db.set(`PartnerlikOlma_${reaction.message.guild.id}`,Date.now())
const Premium = db.fetch(`PremiumSunucu_${reaction.message.guild.id}`)
let Sayılar;
if (!Premium) Sayılar = [1,2]
if (Premium) Sayılar = [3,4,5]
const RandomCoin = Sayılar[Math.floor(Math.random() * Sayılar.length)]
if (!db.fetch(`CoinDurum_${Dataa.Başvuran}_${reaction.message.guild.id}`)) {
db.set(`CoinDurum_${Dataa.Başvuran}_${reaction.message.guild.id}`,true)
db.add(`PartnerCount_${reaction.message.guild.id}_${user.id}`,1)
db.add(`PartnerCount_${Dataa.Başvuran}_${Dataa.Adam}`,1)
db.add(`Coins_${user.id}`,RandomCoin)
db.add(`Coins_${Dataa.Adam}`,RandomCoin)
db.push(`Log_${user.id}`,`${RandomCoin} Coin Eklendi. Sebep: Partnerlik`)
db.push(`Log_${Dataa.Adam}`,`${RandomCoin} Coin Eklendi. Sebep: Partnerlik`)
db.add('BOTPartner',1)
db.add(`PC_${Dataa.Başvuran}`,1)
db.add(`PC_${reaction.message.guild.id}`,1)
} else {
db.add(`Coins_${user.id}`,RandomCoin)
db.add(`Coins_${Dataa.Adam}`,RandomCoin)
db.push(`Log_${user.id}`,`${RandomCoin} Coin Eklendi. Sebep: Partnerlik`)
db.push(`Log_${Dataa.Adam}`,`${RandomCoin} Coin Eklendi. Sebep: Partnerlik`)
db.add(`PartnerCount_${reaction.message.guild.id}_${user.id}`,1)
db.add(`PartnerCount_${Dataa.Başvuran}_${Dataa.Adam}`,1)
db.add('BOTPartner',1)
db.add(`PC_${Dataa.Başvuran}`,1)
db.add(`PC_${reaction.message.guild.id}`,1)
//db.push(`Log_${user.id}`,`Coin Eklenemedi. Sebep: Daha Önce Partnerlik Yapılmış`)
//db.push(`Log_${Dataa.Adam}`,`Coin Eklenemedi. Sebep: Daha Önce Partnerlik Yapılmış`)
}
db.add(`TopPartner_${user.id}`,1)
db.add(`TopPartner_${Dataa.Adam}`,1)
}

if (reaction.emoji.name == 'red' && user.id !== client.user.id) {
reaction.users.remove(user.id)
if (!client.guilds.cache.get(reaction.message.guild.id).members.cache.get(user.id).roles.cache.has(db.fetch(`PartnerSorumlusu_${reaction.message.guild.id}`))) return reaction.message.channel.send(`<@${user.id}>, Partner isteğini kabul edebilmen için \`${client.guilds.cache.get(reaction.message.guild.id).roles.cache.find(Roller => Roller.id === db.fetch(`PartnerSorumlusu_${reaction.message.guild.id}`)).name}\` yetkisine sahip olman gerek.`).then(Hata => Hata.delete({timeout:7500}))
db.delete(`Durum_${reaction.message.guild.id}_${Dataa.Başvuran}`)
db.delete(`${Dataa.Başvuran}_${reaction.message.guild.id}`)
db.delete(`Info_${reaction.message.id}`)
reaction.message.delete()
client.channels.cache.get(reaction.message.channel.id).send(new Discord.MessageEmbed().setColor('BLUE').setAuthor(client.user.tag,client.user.avatarURL()).setFooter(client.user.username,client.user.avatarURL()).setTimestamp().setDescription(`❓ **| Reddetme sebebi yazınız.**`)).then(Message => {
client.guilds.cache.get(reaction.message.guild.id).channels.cache.get(reaction.message.channel.id).awaitMessages(Message => Message.author.id === user.id, {max: 1,time: 60000,errors: ['time']
}).then(async Collected => {
let Cevap;
const Cevap1 = Collected.first().content
if (!Cevap1) Cevap = 'Belirtilmedi'

client.channels.cache.get(reaction.message.channel.id).bulkDelete(2)
Message.edit(new Discord.MessageEmbed().setColor('BLUE').setAuthor(client.user.tag,client.user.avatarURL()).setFooter(client.user.username,client.user.avatarURL()).setTimestamp().setDescription(`${client.onay} **| Partnerlik isteği \`${Cevap1}\` sebebiyle reddedildi.**`)).then(Hata => Hata.delete({timeout:5000}))
client.channels.cache.get(PLog2).send(new Discord.MessageEmbed().setColor('BLUE').setAuthor(client.user.tag,client.user.avatarURL()).setFooter(client.user.username,client.user.avatarURL()).setTimestamp().setDescription(`${client.çarpı} **| \`${client.guilds.cache.get(reaction.message.guild.id).name}\` sunucusuna atmış olduğunuz başvuru bir yetkili tarafından \`${Cevap1}\` sebebiyle reddedildi.**`))
client.channels.cache.get(PLog).send(new Discord.MessageEmbed().setColor('BLUE').setAuthor(client.user.tag,client.user.avatarURL()).setFooter(client.user.username,client.user.avatarURL()).setTimestamp().setDescription(`${client.onay} **| \`${client.guilds.cache.get(Dataa.Başvuran)}\` sunucusundan gelmiş olan partnerlik isteği \`${client.users.cache.get(user.id).tag}\` tarafından \`${Cevap1}\` sebebiyle reddedildi.**`))
})
})
}
})

//Pepe Code
client.elevation = message => {
    if (!message.guild) {
        return
    }
    let permlvl = 0
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3
    if (message.author.id === ayarlar.sahip) permlvl = 4
    return permlvl
}
client.login(ayarlar.token)