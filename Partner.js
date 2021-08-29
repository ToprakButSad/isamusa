const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const ms = require('parse-ms')
const PepeCode = new Set()
const moment = require('moment')
require('moment-duration-format')
moment.locale('tr')
exports.run = async (client, message, args) => {
const Choose = args[0]
if (Choose == 'izin') {
if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Hata! Bu komutu kullanabilmek için \`Yönetici\` yetkisine ihtiyacınız var.**`)).then(Hata => Hata.delete({timeout:7500}))
if (db.fetch(`Coins_${message.author.id}`) < 75) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Sunucunuza 2 davet linki izni almak için \`75\` Coine ihtiyacınız var. Bilgi almak için [tıkla.](${ayarlar.destek})**`)).then(Hata => Hata.delete({timeout:15000}))
message.channel.send(client.embed.setDescription(`❓ **| Bulunduğunuz sunucuya \`2 davet linki yetkisi\` almak istediğinize emin misiniz ?

Bu işlemin ücreti \`75\` coindir.**`)).then(Mesaj => {
Mesaj.react('✅').then(async Tepki => {
const Onay = (reaction, user) => reaction.emoji.name == '✅' && user.id === message.author.id
const Onay2 = Mesaj.createReactionCollector(Onay)
Onay2.on('collect', async(reaction) => {
Mesaj.reactions.removeAll()
db.set(`İkiLinkİzin_${message.guild.id}`,true)
db.add(`Coins_${message.author.id}`,-75)
Mesaj.edit(client.embed.setDescription(`${client.onay} **| Artık 2 davet linki koyabilirsiniz.**`))
db.push(`Log_${message.author.id}`,`2 Davet Koyma Yetkisi Alındı | 75 Coin`)
})
})
})
} else {
if (Choose == 'vip') {
if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Hata! Bu komutu kullanabilmek için \`Yönetici\` yetkisine ihtiyacınız var.**`)).then(Hata => Hata.delete({timeout:7500}))
if (db.fetch(`Coins_${message.author.id}`) < 150) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Sunucunuza premium alabilmek için \`150\` Coine ihtiyacınız var. Bilgi almak için [tıkla.](${ayarlar.destek})**`)).then(Hata => Hata.delete({timeout:15000}))
const Data31 = db.fetch(`PremiumSunucuBilgiSüre_${message.guild.id}`)
const Saat31 = 604800000
if (Saat31 - (Date.now() - Data31) > 0){
const Minute = ms(Saat31 - (Date.now() - Data31))
return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Zaten sunucunda bir premium var.

\`${Minute.days} gün, ${Minute.hours} saat ${Minute.minutes} dakika\` bekle.**`)).then(Hata => Hata.delete({timeout:15000}))
}
message.channel.send(client.embed.setDescription(`❓ **| Bulunduğunuz sunucuya \`1 haftalık\` premium almak istediğinize emin misiniz ?

> **__NOT__:** Eğer [destek](${ayarlar.destek}) sunucumuzda bulunursanız size özel rol verilir. (Bunu premium almadan önce yapmalısınız.)

Bu işlemin ücreti \`150\` coindir.**`)).then(Mesaj => {
Mesaj.react('✅').then(async Tepki => {
const Onay = (reaction, user) => reaction.emoji.name == '✅' && user.id === message.author.id
const Onay2 = Mesaj.createReactionCollector(Onay)
Onay2.on('collect', async(reaction) => {
Mesaj.reactions.removeAll()
db.add(`Coins_${message.author.id}`,-150)
Mesaj.edit(client.embed.setDescription(`${client.onay} **| Sistem başarıyla açıldı.**`))
db.set(`PremiumSunucu_${message.guild.id}`,true)
db.set(`PremiumSunucuBilgi_${message.guild.id}`,{Ayarlayan: message.author.id, Süre: Date.now(), Tarih: moment().format('LLL')})
db.set(`PremiumSunucuBilgiSüre_${message.guild.id}`,Date.now())
db.set(`PremiumAldı_${message.author.id}`,true)
db.set(`PreAlmaBilgi_${message.author.id}`,{Süre: Date.now(), Alma: message.guild.id})
db.push(`Log_${message.author.id}`,`Premium Sunucu Alındı | 150 Coin`)
if (client.guilds.cache.get('813459382096232528').members.cache.find(User => User.id == message.author.id)) {
client.guilds.cache.get('813459382096232528').members.cache.get(message.author.id).roles.add('822767014317654044')
} 
})
await Mesaj.react('❌').then(() => {
const Onay = (reaction, user) => reaction.emoji.name == '❌' && user.id === message.author.id
const Onay2 = Mesaj.createReactionCollector(Onay)
Onay2.on('collect', async() => {
Mesaj.reactions.removeAll()
Mesaj.edit(client.embed.setDescription(`${client.çarpı} **| Premium alma isteğinden vazgeçildi.**`))
})
})
})
})
} else {
if (Choose == 'şart') {
if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Hata! Bu komutu kullanabilmek için \`Yönetici\` yetkisine ihtiyacınız var.**`)).then(Hata => Hata.delete({timeout:7500}))
if (args[1] == 'ayarla') {
const Üye = args[2]
if (isNaN(Üye)) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Lütfen bir üye sayısı giriniz.**`)).then(Hata => Hata.delete({timeout:45000}))
if (Üye > message.guild.memberCount) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Üzgünüm, maximum sunucunuzda bulanan üye sayısı, yani \`${message.guild.memberCount}\` yapabilirsiniz.**`)).then(Hata => Hata.delete({timeout:45000}))
let TDK;
const RÜye = `${Üye}`
const RTDK = RÜye.slice(RÜye.length-1)
if (RTDK == 0) TDK = 'dan'
if (RTDK == 1) TDK = 'den'
if (RTDK == 2) TDK = 'den'
if (RTDK == 3) TDK = 'ten'
if (RTDK == 4) TDK = 'ten'
if (RTDK == 5) TDK = 'ten'
if (RTDK == 6) TDK = 'dan'
if (RTDK == 7) TDK = 'den'
if (RTDK == 8) TDK = 'den'
if (RTDK == 9) TDK = 'dan'
message.channel.send(client.embed.setDescription(`${client.onay} **| Artık sunucusundaki üye sayısı \`${Üye}\`'${TDK} büyük olmayan sunucular bu sunucuya partnerlik isteği atamayacak.**`))
db.set(`PartnerŞart_${message.guild.id}`,{Ayarlayan: message.author.id, Tarih: moment().format('LLL'), Üye: Number(Üye)})
db.set(`PBPartnerŞart_${message.guild.id}`,Number(Üye))
} else {
if (args[1] == 'sıfırla') {
message.channel.send(client.embed.setDescription(`${client.onay} **| Partner şart başarıyla sıfırlandı.**`))
db.delete(`PartnerŞart_${message.guild.id}`)
db.delete(`PBPartnerŞart_${message.guild.id}`)
} else return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Hata! Lütfen seçenek seçin. \`(ayarla | sıfırla)\`**`))
}
} else {
if (Choose == 'log') {
if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Hata! Bu komutu kullanabilmek için \`Yönetici\` yetkisine ihtiyacınız var.**`)).then(Hata => Hata.delete({timeout:7500}))
if (args[1] == 'ayarla') {
const Kanal = message.mentions.channels.first()
if (!Kanal) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Lütfen bir kanal etiketleyin.**`)).then(Hata => Hata.delete({timeout:45000}))
message.channel.send(client.embed.setDescription(`${client.onay} **| Partner log kanalı başarıyla <#${Kanal.id}> olarak ayarlandı.**`))

db.set(`PartnerLogKanal_${message.guild.id}`,{Ayarlayan: message.author.id, Tarih: moment().format('LLL'), Kanal: Kanal.id})
} else {
if (args[1] == 'sıfırla') {
message.channel.send(client.embed.setDescription(`${client.onay} **| Partner kanalı başarıyla sıfırlandı.**`))
db.delete(`PartnerLogKanal_${message.guild.id}`)
} else return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Hata! Lütfen seçenek seçin. \`(ayarla | sıfırla)\`**`))
}
} else {

if (Choose == 'kanal') {
if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Hata! Bu komutu kullanabilmek için \`Yönetici\` yetkisine ihtiyacınız var.**`)).then(Hata => Hata.delete({timeout:7500}))
if (args[1] == 'ayarla') {
const Kanal = message.mentions.channels.first()
if (!Kanal) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Lütfen bir kanal etiketleyin.**`)).then(Hata => Hata.delete({timeout:45000}))
message.channel.send(client.embed.setDescription(`${client.onay} **| Partner kanalı başarıyla <#${Kanal.id}> olarak ayarlandı.**`))

db.set(`PartnerKanal_${message.guild.id}`,{Ayarlayan: message.author.id, Tarih: moment().format('LLL'), Kanal: Kanal.id})
} else {
if (args[1] == 'sıfırla') {
message.channel.send(client.embed.setDescription(`${client.onay} **| Partner kanalı başarıyla sıfırlandı.**`))
db.delete(`PartnerKanal_${message.guild.id}`)
} else return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Hata! Lütfen seçenek seçin. \`(ayarla | sıfırla)\`**`))
}
} else {
if (Choose == 'ol') {
if (!db.fetch(`PartnerSorumlusu_${message.guild.id}`)) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Sunucuda Partner Sorumlusu rolü aktif değil. 

\`${ayarlar.prefix}partner sorumlusu @Partner Sorumlusu\`**`)).then(Hata => Hata.delete({timeout:45000}))
if (!db.fetch(`PartnerText_${message.guild.id}`)) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Sunucuda Partner Text ayarlı değil. 

\`${ayarlar.prefix}partner text <Text>\`**`)).then(Hata => Hata.delete({timeout:45000}))
if (!db.fetch(`Sistem_${message.guild.id}`)) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Sunucuda sistem aktif değil. 

\`${ayarlar.prefix}partner aç\`**`)).then(Hata => Hata.delete({timeout:45000}))
if (!db.fetch(`PartnerKanal_${message.guild.id}`)) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Sunucuda partner kanalı ayarlı değil. 

\`${ayarlar.prefix}partner kanal #partner\`**`)).then(Hata => Hata.delete({timeout:45000}))
if (!db.fetch(`PartnerLogKanal_${message.guild.id}`)) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Sunucuda partner log kanalı ayarlı değil. 

\`${ayarlar.prefix}partner log-kanal ayarla #partner-log\`**`)).then(Hata => Hata.delete({timeout:45000}))

if (!message.member.roles.cache.has(db.fetch(`PartnerSorumlusu_${message.guild.id}`))) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Bu komutu kullanabilmek için \`${message.guild.roles.cache.get(db.fetch(`PartnerSorumlusu_${message.guild.id}`)).name}\` rolüne sahip olman gerekli.**`)).then(Hata => Hata.delete({timeout:15000}))  
const Guild2 = args[1]
if (!Guild2) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Lütfen bir ID veya URL girin.**`)).then(Hata => Hata.delete({timeout:15000}))
const Guild = Guild2.toLowerCase()
if (!client.guilds.cache.get(db.fetch(Guild))) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Böyle bir sunucuda olduğuma emin değilim.**`)).then(Hata => Hata.delete({timeout:45000}))  
if (!db.fetch(Guild.toLowerCase())) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Girdiğiniz URL ya da ID ile hiç bir sunucu eşleşmedi.**`)).then(Hata => Hata.delete({timeout:15000}))
if (!db.has(`Sistem_${db.fetch(Guild)}`)) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| \`${client.guilds.cache.get(db.fetch(Guild)).name}\` sunucusunda sistem aktif değil.**`)).then(Hata => Hata.delete({timeout:15000}))
if (!db.fetch(`PartnerSorumlusu_${db.fetch(Guild)}`)) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Partnerlik yapılmak istenen Sunucuda Partner Sorumlusu rolü aktif değil. **`)).then(Hata => Hata.delete({timeout:15000}))
if (!db.fetch(`PartnerText_${db.fetch(Guild)}`)) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Partnerlik yapılmak istenen Sunucuda Partner Text ayarlı değil. **`)).then(Hata => Hata.delete({timeout:15000}))
if (!db.fetch(`Sistem_${db.fetch(Guild)}`)) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Partnerlik yapılmak istenen Sunucuda Sistem aktif değil.**`)).then(Hata => Hata.delete({timeout:15000}))
if (!db.fetch(`PartnerKanal_${db.fetch(Guild)}`)) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Partnerlik yapılmak istenen Sunucuda partner kanalı ayarlı değil.**`)).then(Hata => Hata.delete({timeout:15000}))
if (!db.fetch(`PartnerLogKanal_${db.fetch(Guild)}`)) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Partnerlik yapılmak istenen Sunucuda partner log kanalı ayarlı değil.**`)).then(Hata => Hata.delete({timeout:15000}))
if (db.fetch(Guild) == message.guild.id) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Yazdığın sunucu bu sunucuyu işaret ediyor.**`)).then(Hata => Hata.delete({timeout:15000}))
let Şartt;
if (db.has(`PartnerŞart_${db.fetch(Guild)}`)) Şartt = db.fetch(`PartnerŞart_${db.fetch(Guild)}`).Üye
if (!db.fetch(`PartnerŞart_${db.fetch(Guild)}`)) Şartt = 0
if (message.guild.memberCount < Şartt) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Yazdığın sunucudaki partner şartını karşılayamıyorsun.**

**Şart: \`${db.fetch(`PartnerŞart_${db.fetch(Guild)}`).Üye} üye\`**
**Sunucudaki üye sayısı: \`${message.guild.memberCount}\`**
**Gereken üye: \`${db.fetch(`PartnerŞart_${db.fetch(Guild)}`).Üye - message.guild.memberCount} üye\`**
`)).then(Hata => Hata.delete({timeout:15000}))
const Teext = db.fetch(`PartnerText_${message.guild.id}`).Text
const Size = Teext.toLowerCase().split('discord.gg/').join(client.user.username)
const RSize = Size.split(client.user.username).length-1
if (Number(RSize) > 1 && !db.fetch(`İkiLinkİzin_${message.guild.id}`)) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Üzgünüm, partner textinde 1'den fazla sunucu linki var.

\`${ayarlar.prefix}parnter izin\` yazarak \`75\` coine izin alabilirsiniz.**`))
const Teext2 = db.fetch(`PartnerText_${db.fetch(Guild)}`).Text
const Size2 = Teext2.toLowerCase().split('discord.gg/').join(client.user.username)
const RSize2 = Size2.split(client.user.username).length-1
//if (client.guilds.cache.get(db.fetch(Guild)).members.cache.filter(Users => Users.roles.cache.has(db.fetch(`PartnerSorumlusu_${db.fetch(Guild)}`)).size) < 1) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Partnerlik yapılmak istenen sunucuda kimsede partner sorumlusu rolü yok.**`)).then(Hata => Hata.delete({timeout:15000}))
/*const Saat = 10800000
const Time = db.fetch(`${message.guild.id}_${db.fetch(Guild)}`)
if(Saat - (Date.now() - Time.Süre) > 0) {
const Minute = ms(Saat - (Date.now() - Time.Süre))
message.channel.send(client.embed.setDescription(`${client.çarpı} **| Zaten \`${client.guilds.cache.get(db.fetch(Guild)).name}\` sunucusuna istek göndermişsin!
\`${Minute.hours} saat ${Minute.minutes} dakika\` bekle.**`))   
} else {*/
const Data1 = db.fetch(`${message.guild.id}_${db.fetch(Guild)}_Süre`)
const Saat = 43200000
if (Saat - (Date.now() - Data1) > 0){
const Minute = ms(Saat - (Date.now() - Data1))
return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Zaten \`${client.guilds.cache.get(db.fetch(Guild)).name}\` sunucusuna istek göndermişsin!

\`${Minute.hours} saat ${Minute.minutes} dakika\` bekle.**`)).then(Hata => Hata.delete({timeout:15000}))
}
const Data2 = db.fetch(`${db.fetch(Guild)}_${message.guild.id}_Süre`)
if (Saat - (Date.now() - Data2) > 0){
const Minute = ms(Saat - (Date.now() - Data2))
return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Zaten \`${client.guilds.cache.get(db.fetch(Guild)).name}\` sunucusuyla partnerlik yapmışsın!

\`${Minute.hours} saat ${Minute.minutes} dakika\` bekle.**`)).then(Hata => Hata.delete({timeout:15000}))
}
let Data3Saat;
if (!db.fetch(`PremiumSunucu_${message.guild.id}`)) Data3Saat = 180000
if (db.fetch(`PremiumSunucu_${message.guild.id}`) == true) Data3Saat = 0
const Data3 = db.fetch(`PartnerlikOlma_${message.guild.id}`)
if (Data3Saat - (Date.now() - Data3) > 0){
const Minute = ms(Data3Saat - (Date.now() - Data3))
return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Zaten bir sunucuya istek yollamışsın yada bir isteği kabul etmişsin! Yavaş mod içerisindesin.

Bir sonraki partnerlik başvurusu yapmana \`${Minute.minutes} dakika ${Minute.seconds} saniye\` kaldı.**`)).then(Hata => Hata.delete({timeout:15000}))
}
db.set(`PartnerlikOlma_${message.guild.id}`,Date.now())
if (Number(RSize2) > 1) return message.channel.send(client.embed.setDescription(`⚠ **| Uyarı! 

Partnerlik yapmak istediğiniz \`${client.guilds.cache.get(db.fetch(Guild)).name}\` sunucusunun partner textinde 1'den fazla sunucu davet linki var. Gerçekten partnerlik isteği yollamak istiyor musun ?**`)).then(Embed => {

const Filtre = (reaction, user) => {
return reaction.emoji.name === '✅' && user.id === message.author.id
}
Embed.react('✅')
const Tepkiler = Embed.createReactionCollector(Filtre, {
})
Tepkiler.on('collect', async (Tepki) => {
if (Tepki.emoji.name === '✅') {
client.channels.cache.get(message.channel.id).send(client.embed.setDescription(`${client.onay} **| Başvuru isteği \`${client.guilds.cache.get(db.fetch(Guild)).name}\` sunucusundaki ayarlanmış olan partner kanalına Gönderildi. Yetkililerin cevabı bekleniyor..**`)).catch(err => { //\`${client.guilds.cache.get(db.fetch(Guild)).members.cache.filter(Users => Users.roles.cache.has(db.fetch(`PartnerSorumlusu_${db.fetch(Guild)}`))).size}\`
message.channel.send(client.embed2.setDescription(`${client.çarpı} **| Partnerlik yapılmak istenen sunucuda ayarlanmış olan kanala mesaj gönderme yetkim yok.**`))
})
db.set(`${message.guild.id}_${db.fetch(Guild)}`,{Süre: Date.now(), Yollayan: message.author.id})
db.set(`${message.guild.id}_${db.fetch(Guild)}_Süre`,Date.now())
db.set(`${db.fetch(Guild)}_${message.guild.id}_Süre`,Date.now())
client.guilds.cache.get(message.guild.id).channels.cache.filter(Revenge => Revenge.type == 'text' && Revenge.id == message.channel.id).first().createInvite({
temporary: false,
maxAge: 0,
maxUses: 0,
reason: 'Specify Reason',
}).then(async Davet => {

const Embed = client.embed.setTitle('😍 **| Partnerlik İsteği!**')
.setDescription(`\`${message.guild.name}\` Sunucusundan Bir Yetkili Olan
\`${message.author.tag}\` Kullanıcısı \`${client.guilds.cache.get(db.fetch(Guild)).name}\` Sunucusu için partner olmak istedi.

Bilgiler;`)
.addField('» 🎋 Sunucu Adı','`'+message.guild.name+' / '+message.guild.premiumTier+' Level ('+message.guild.premiumSubscriptionCount+' Boost)`')
.addField('» 👑 Sunucu Sahibi','`'+client.users.cache.get(message.guild.ownerID).tag+'`')
.addField('» 📅 Sunucu Oluşturulma Tarihi','`'+moment(message.guild.createdAt).format('LLL')+' | ('+moment(message.guild.createdAt, "DD").fromNow()+')`')
.addField('» 🤵 Partner Başvurusu Yapan','`'+message.author.tag+'`')
.addField('» 📥 Sunucu Davet Linki',Davet)
.addField('» 📜 Partner Textindeki Sunucu Sayısı',RSize)
.addField('» 🤖 Sunucudaki BOT Sayısı','`'+message.guild.members.cache.filter(User => User.user.bot == true).size+'`',true)
.addField('» 🙍‍♂️ Sunucudaki İnsan Sayısı','`'+message.guild.members.cache.filter(User => !User.user.bot).size+'`',true)
.addField('» 👨‍🎓 Sunucudaki Üye Sayısı','`'+message.guild.memberCount+' Üye / '+message.guild.members.cache.filter(User => User.presence.status !== 'offline').size+' Aktif \n(Botlar Dahil)`',true)
.addField('» 👻 Sunucudaki Hesabı 7 Günden Önce Açılmış Üye Sayısı','`'+`${message.guild.members.cache.filter(User => !User.user.bot && moment.duration(new Date().getTime() - User.user.createdAt.getTime()).format('DD') < 7).size+Number(1)}`+'`',true)
.addField('» 📷 Sunucudaki Avatarlı / Avatarsız Üye Sayısı','`'+message.guild.members.cache.filter(Member => Member.user.avatarURL() !== undefined).size+' Avatarlı / '+message.guild.members.cache.filter(Member => Member.user.avatarURL() == undefined).size+' Avatarsız \n(Botlar Dahil)`',true)
client.channels.cache.get(db.fetch(`PartnerLogKanal_${db.fetch(Guild)}`).Kanal).send('<@&'+db.fetch(`PartnerSorumlusu_${db.fetch(Guild)}`)+'>',Embed).then(async Mesaj => {
Mesaj.react(client.onay)
Mesaj.react(client.çarpı)
db.set(`Durum_${message.guild.id}_${db.fetch(Guild)}`,true)
db.set(`Info_${Mesaj.id}`,{Başvurulan:db.fetch(Guild), Başvuran: message.guild.id, Adam: message.author.id})
})
})
}
})
})

client.channels.cache.get(message.channel.id).send(client.embed.setDescription(`${client.onay} **| Başvuru isteği \`${client.guilds.cache.get(db.fetch(Guild)).name}\` sunucusundaki ayarlanmış olan partner kanalına Gönderildi. Yetkililerin cevabı bekleniyor..**`)).catch(err => { //\`${client.guilds.cache.get(db.fetch(Guild)).members.cache.filter(Users => Users.roles.cache.has(db.fetch(`PartnerSorumlusu_${db.fetch(Guild)}`))).size}\`
message.channel.send(client.embed2.setDescription(`${client.çarpı} **| Partnerlik yapılmak istenen sunucuda ayarlanmış olan kanala mesaj gönderme yetkim yok.**`))
})
db.set(`${message.guild.id}_${db.fetch(Guild)}`,{Süre: Date.now(), Yollayan: message.author.id})
db.set(`${message.guild.id}_${db.fetch(Guild)}_Süre`,Date.now())
db.set(`${db.fetch(Guild)}_${message.guild.id}_Süre`,Date.now())
client.guilds.cache.get(message.guild.id).channels.cache.filter(Revenge => Revenge.type == 'text' && Revenge.id == message.channel.id).first().createInvite({
temporary: false,
maxAge: 0,
maxUses: 0,
reason: 'Specify Reason',
}).then(async Davet => {

const Embed = client.embed.setTitle('😍 **| Partnerlik İsteği!**')
.setDescription(`\`${message.guild.name}\` Sunucusundan Bir Yetkili Olan
\`${message.author.tag}\` Kullanıcısı \`${client.guilds.cache.get(db.fetch(Guild)).name}\` Sunucusu için partner olmak istedi.

Bilgiler;`)
.addField('» 🎋 Sunucu Adı','`'+message.guild.name+' / '+message.guild.premiumTier+' Level ('+message.guild.premiumSubscriptionCount+' Boost)`')
.addField('» 👑 Sunucu Sahibi','`'+client.users.cache.get(message.guild.ownerID).tag+'`')
.addField('» 📅 Sunucu Oluşturulma Tarihi','`'+moment(message.guild.createdAt).format('LLL')+' | ('+moment(message.guild.createdAt, "DD").fromNow()+')`')
.addField('» 🤵 Partner Başvurusu Yapan','`'+message.author.tag+'`')
.addField('» 📥 Sunucu Davet Linki',Davet)
.addField('» 📜 Karşı Tarafın Partner Textindeki Davet Linki Sayısı',RSize)
.addField('» 🤖 Sunucudaki BOT Sayısı','`'+message.guild.members.cache.filter(User => User.user.bot == true).size+'`',true)
.addField('» 🙍‍♂️ Sunucudaki İnsan Sayısı','`'+message.guild.members.cache.filter(User => !User.user.bot).size+'`',true)
.addField('» 👨‍🎓 Sunucudaki Üye Sayısı','`'+message.guild.memberCount+' Üye / '+message.guild.members.cache.filter(User => User.presence.status !== 'offline').size+' Aktif \n(Botlar Dahil)`',true)
.addField('» 👻 Sunucudaki Hesabı 7 Günden Önce Açılmış Üye Sayısı','`'+`${message.guild.members.cache.filter(User => !User.user.bot && moment.duration(new Date().getTime() - User.user.createdAt.getTime()).format('DD') < 7).size+Number(1)}`+'`',true)
.addField('» 📷 Sunucudaki Avatarlı / Avatarsız Üye Sayısı','`'+message.guild.members.cache.filter(Member => Member.user.avatarURL() !== undefined).size+' Avatarlı / '+message.guild.members.cache.filter(Member => Member.user.avatarURL() == undefined).size+' Avatarsız \n(Botlar Dahil)`',true)
client.channels.cache.get(db.fetch(`PartnerLogKanal_${db.fetch(Guild)}`).Kanal).send('<@&'+db.fetch(`PartnerSorumlusu_${db.fetch(Guild)}`)+'>',Embed).then(async Mesaj => {
Mesaj.react(client.onay)
Mesaj.react(client.çarpı)
db.set(`Durum_${message.guild.id}_${db.fetch(Guild)}`,true)
db.set(`Info_${Mesaj.id}`,{Başvurulan:db.fetch(Guild), Başvuran: message.guild.id, Adam: message.author.id})
})
})
} else {
if (Choose == 'sorumlusu') {
if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Hata! Bu komutu kullanabilmek için \`Yönetici\` yetkisine ihtiyacınız var.**`)).then(Hata => Hata.delete({timeout:7500}))
const Rol = message.mentions.roles.first()
if (!Rol) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Rol etiketlemediniz.**`)).then(Hata => Hata.delete({timeout:45000}))
message.channel.send(client.embed.setDescription(`${client.onay} **| Artık Partner sorumlusu rolü \`${Rol.name}\` olarak ayarlandı.**`))
db.set(`PartnerSorumlusu_${message.guild.id}`,Rol.id)
} else {
if (Choose == 'text') {
if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Hata! Bu komutu kullanabilmek için \`Yönetici\` yetkisine ihtiyacınız var.**`)).then(Hata => Hata.delete({timeout:7500}))
if (args[1] == 'ayarla') {
const Text = args.slice(2).join(' ')
if (!Text) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Lütfen bir text girin.**`)).then(Hata => Hata.delete({timeout:45000}))
message.channel.send(client.embed.setDescription(`${client.onay} **| Partner texti başarıyla ayarlandı.**`))
db.set(`PartnerText_${message.guild.id}`,{Ayarlayan: message.author.id, Tarih: moment().format('LLL'), Text: Text})
} else {
if (args[1] == 'sıfırla') {
message.channel.send(client.embed.setDescription(`${client.onay} **| Partner texti başarıyla sıfırlandı.**`))
db.delete(`PartnerText_${message.guild.id}`)
} else return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Hata! Lütfen seçenek seçin. \`(ayarla | sıfırla)\`**`))
}
} else {
if (Choose == 'aç') {
if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Hata! Bu komutu kullanabilmek için \`Yönetici\` yetkisine ihtiyacınız var.**`)).then(Hata => Hata.delete({timeout:7500}))
message.channel.send(client.embed.setDescription(`${client.onay} **| Partnerlik sistemi başarıyla aktif hale getirildi.**`))
db.set(`Sistem_${message.guild.id}`,{Ayarlayan: message.author.id, Tarih: moment().format('LLL')})
} else {
if (Choose == 'kapat') {
if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Hata! Bu komutu kullanabilmek için \`Yönetici\` yetkisine ihtiyacınız var.**`)).then(Hata => Hata.delete({timeout:7500}))
message.channel.send(client.embed.setDescription(`${client.onay} **| Partnerlik sistemi başarıyla \`deaktif\` hale getirildi.**`))
db.delete(`Sistem_${message.guild.id}`)
} else {
if (Choose == 'sıfırla') {
if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Hata! Bu komutu kullanabilmek için \`Yönetici\` yetkisine ihtiyacınız var.**`)).then(Hata => Hata.delete({timeout:7500}))
message.channel.send(client.embed.setDescription('❓ **| Partnerlik sistemini kapatmak istediğine emin misin ?**')).then(Mesaj => {
Mesaj.react('✅').then(async Tepki => {
const Onay = (reaction, user) => reaction.emoji.name == '✅' && user.id === message.author.id
const Onay2 = Mesaj.createReactionCollector(Onay)
Onay2.on('collect', async(reaction) => {
Mesaj.reactions.removeAll()
Mesaj.edit(client.embed.setDescription(`${client.onay} **| Sistem başarıyla sıfırlandı.**`))
db.delete(`PartnerSorumlusu_${message.guild.id}`)
db.delete(`Sistem_${message.guild.id}`)
db.delete(`PartnerText_${message.guild.id}`)
db.delete(`PartnerKanal_${message.guild.id}`)
db.delete(`PartnerLogKanal_${message.guild.id}`)
db.delete(`URL_${message.guild.id}`)
})

await Mesaj.react('❌').then(() => {
const Onay = (reaction, user) => reaction.emoji.name == '❌' && user.id === message.author.id
const Onay2 = Mesaj.createReactionCollector(Onay)

Onay2.on('collect', async() => {
Mesaj.reactions.removeAll()
Mesaj.edit(client.embed.setDescription(`${client.çarpı} **| Sıfırlama isteğinden vazgeçildi.**`))
})
})
})
})
} else return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Hata! Lütfen seçenek seçin.
\`(sorumlusu | text ayarla | text sıfırla | aç | kapat | sıfırla | ol | kanal | log | şart | vip | izin)\`**`)
.addField('\u200b','📖 **| Örnek;**').setImage('https://cdn.discordapp.com/attachments/761282311735345154/815170859681185822/unknown.png')).then(Hata => Hata.delete({timeout:45000}))
}
}
}
}
}
}
}
}
}
}
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['partner'],
    permLevel: 0
  }
  
  exports.help = {
    name: 'Partner',
    description: 'Partnerlik Yapma Komutu.',
    usage: 'partner'
  }