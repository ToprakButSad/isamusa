const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')
const moment = require('moment')
require('moment-duration-format')
moment.locale('tr')

exports.run = async (client, message, args) => {
if (!ayarlar.sahip.includes(message.author.id)) return message.channel.send(client.embed.setDescription('Bu Komutu Kullanmak İçin **`Sahibim`** Olman Lazım!')).then(Hata => Hata.delete({timeout:7500}))
if (args[0] == 'çıkart') {
const Üye = message.mentions.users.first() || client.users.cache.get(args[1])
if (!Üye) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Bir üye etiketleyin ya da ID girin.**`)).then(Hata => Hata.delete({timeout:7500}))
const KaraListe = db.fetch(`KaraListe_${Üye.id}`)
if (!KaraListe) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Üye zaten kara listede değil!**`)).then(Hata => Hata.delete({timeout:7500}))
message.channel.send(client.embed.setDescription(`❓ **| Üyeyi kara listeden çıkartmak istediğinize emin misiniz ?**

  > Sebep: \`${KaraListe.Sebep}\`
  > Kara Listeye Alan: \`${KaraListe.Alan}\`
  > Kara Listeye Alınma Tarihi: \`${KaraListe.Tarih}\`
  > Kara Listede Geçen Süre: \`${moment(KaraListe.Süre).startOf('minutes').fromNow()}\`
`)).then(Mesaj => {
Mesaj.react(client.onay).then(async Tepki => {
const Onay = (reaction, user) => reaction.emoji.name == 'onay' && user.id === message.author.id
const Onay2 = Mesaj.createReactionCollector(Onay)
Onay2.on('collect', async(reaction) => {
Mesaj.reactions.removeAll()
Mesaj.edit(client.embed.setDescription(`${client.onay} **| Kullanıcı kara listeyden çıkartıldı.**`))
db.delete(`KaraListe_${Üye.id}`)
client.channels.cache.get('816981384954511360').send(client.embed.setDescription(`\`${Üye.tag}\` kullanıcısı \`${message.author.tag}\` tarafından kara listeden çıkartıldı!`))
})

await Mesaj.react(client.çarpı).then(() => {
const Onay = (reaction, user) => reaction.emoji.name == 'red' && user.id === message.author.id
const Onay2 = Mesaj.createReactionCollector(Onay)
Onay2.on('collect', async() => {
Mesaj.reactions.removeAll()
Mesaj.edit(client.embed.setDescription(`${client.çarpı} **| İstek İptal Edildi!**`))
})
})
})
})
} else {
const Üyee = message.mentions.users.first() || client.users.cache.get(args[0])
if (!Üyee) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Bir üye etiketleyin ya da ID girin.**`)).then(Hata => Hata.delete({timeout:7500}))
const KaraListe = db.fetch(`KaraListe_${Üyee.id}`)
if (KaraListe) return message.channel.send(client.embed.setDescription(`${client.çarpı} **| Üye zaten kara listede.**


  > Sebep: \`${KaraListe.Sebep}\`
  > Kara Listeye Alan: \`${client.users.cache.get(KaraListe.Alan).tag}\`
  > Kara Listeye Alınma Tarihi: \`${KaraListe.Tarih}\`
`))
const Sebep = args.slice(1).join(' ')
if (!Sebep) return message.channel.send(client.embed.setDescription('Lütfen Bir Sebep Giriniz!'))
message.channel.send(client.embed.setDescription(`${client.onay} **| \`${Üyee.tag}\` kullanıcısı \`${Sebep}\` sebebinden dolayı kara listeye alındı.**`))
db.set(`KaraListe_${Üyee.id}`,{Sebep:Sebep, Alan: message.author.id, Tarih: moment().format('LLL'), Süre:message.createdAt})
client.channels.cache.get('816981384954511360').send(client.embed.setDescription(`${client.onay} **| Üye kara listeye alındı.**


  > Sebep: \`${Sebep}\`
  > Kara Listeye: \`${message.author.tag}\`
  > Kara Listeye Alınma Tarihi: \`${moment().format('LLL')}\`
`))
}
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['kara-liste','kl','karaliste','black-list','blacklist'],
    permLevel: 0
  }
  
  exports.help = {
    name: 'Kara Liste',
    description: 'Kara Listeye Alma.',
    usage: 'kl'
  }