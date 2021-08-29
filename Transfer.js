const Discord = require('discord.js')
const db = require('quick.db')
exports.run = async (client, message, args) => {
    const User = message.mentions.users.first() || client.users.cache.get(args[0])
    const Amount = args[1]
    if (!User) return message.channel.send('Lütfen Kullanıcı Etiketleyin')
    if (isNaN(Amount)) return message.channel.send('Lütfen Miktar Yazın')
    if (db.fetch(`Coins_${message.author.id}`) < Amount) return message.channel.send(`<@${message.author.id}> Senin Bakiyende **${Amount}** Coins Yok!`)
    if (User.id === message.author.id) return message.channel.send(`<@${message.author.id}> **Kendine** Para Gönderemezsin!`)
    if (User.bot) return message.channel.send(`<@${message.author.id}> **Bot**lara Coin Göndermezsin!`)
    if (Amount < 5) return message.channel.send(`<@${message.author.id}> Minimum **5** Coin Yollayabilirsin!`)
    message.react('✅')
    message.channel.send(`${User} Kullanıcısına **${Amount}** Coin Yolladın!`) 
    db.push(`Log_${User.id}`,`${Amount} Coin Alındı. Tarafından: ${message.author.tag}`)
    db.push(`Log_${message.author.id}`,`${Amount} Coin Yollandı! To -> ${User.tag}`)
    db.add(`Coins_${message.author.id}`,-Amount)
    db.add(`Coins_${User.id}`,Amount)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['send','transfer','pay'],
    permLevel: 0
  }
  
  exports.help = {
    name: 'Para Yollama',
    description: 'Para Yollama',
    usage: 's'
  }