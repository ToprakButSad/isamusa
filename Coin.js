const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')

exports.run = async (client, message, args) => {
if(!ayarlar.sahip.includes(message.author.id)) return message.channel.send(client.embed.setDescription('Sadece Kuruculara Özeldir')).then(Hata => Hata.delete({timeout:15000}))

if (args[0] == 'ekle') {
const Üye = message.mentions.users.first() || client.users.cache.get(args[1])
if (!Üye) return message.channel.send('Üye Etiketlemelisin!')
const Miktar = args[1]
if (isNaN(args[1])) return message.channel.send('Lütfen Miktar Giriniz!')
message.channel.send(`**\`${client.users.cache.get(Üye.id).tag}\`** Kullanıcısına **\`${Miktar}\`** Coin Eklendi!`)
db.add(`Coins_${Üye.id}`,Miktar)
db.push(`Log_${Üye.id}`,`${Miktar} Coin Eklendi. Ekleyen: ${message.author.tag}`)
} else {
if (args[0] == 'sil') {
  const Üye = message.mentions.users.first() || client.users.cache.get(args[1])
  if (!Üye) return message.channel.send('Üye Etiketlemelisin!')
  const Miktar = args[2]
  if (isNaN(args[2])) return message.channel.send('Lütfen Miktar Giriniz!')
  message.channel.send(`**\`${client.users.cache.get(Üye.id).tag}\`** Kullanıcısından **\`${Miktar}\`** Coin Silindi!`)
  db.add(`Coins_${Üye.id}`,-Miktar)
  db.push(`Log_${Üye.id}`,`${Miktar} Coin Silindi. Silen: ${message.author.tag}`)
} else return message.channel.send('Bir Seçenek Belirtin! `ekle` | `sil`')

} 
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['coin'],
    permLevel: 0
  }
  
  exports.help = {
    name: 'Coin Verme - Silme',
    description: 'Üyeden Coin Siler - Ekler.',
    usage: 'c'
  }