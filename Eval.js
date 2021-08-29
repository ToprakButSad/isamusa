const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
  if (!ayarlar.sahip.includes(message.author.id)) return  message.channel.send('Bu Komutu Kullanmak İçin **`Sahibim`** Olman Lazım!')
  try {
    let codein = args.join(" ")
    let code = eval(codein)
    if (codein.length < 1) return message.channel.send(client.embed.setDescription('Bir Kod Girmelisin !'))
    if (codein == 'client.token') return message.channel.send(client.embed.setDescription('Tokenim Yok Benim.'))
    if (codein == 'db.all().map(x => db.delete(x.ID))') return message.channel.send(client.embed.setDescription('Datayı Sıfırlayamazsın.'))
    if (typeof code !== 'string')    
      code = require('util').inspect(code, { depth: 0 })
    const Embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .addField('Kod', `\`\`\`js\n${codein}\`\`\``)
    .addField('Sonuç', `\`\`\`js\n${code}\n\`\`\``)
    message.channel.send(Embed)
  } catch(e) {
    const Embed2 = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .addField('Hata', "\`\`\`js\n"+e+"\n\`\`\`")
    message.channel.send(Embed2)
  }

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['eval'],
    permLevel: 0
  }
  
  exports.help = {
    name: 'Eval',
    description: 'Kod Denemeyi Sağlar.',
    usage: 'eval'
  }