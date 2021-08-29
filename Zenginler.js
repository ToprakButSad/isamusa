const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
module.exports.run = async(client, message, args) => {
//if(!ayarlar.sahip.includes(message.author.id)) return message.channel.send(client.embed.setDescription('Sadece Kuruculara Özeldir')).then(Hata => Hata.delete({timeout:15000}))

        const Teyit = db.all().filter(data => data.ID.startsWith(`Coins_`)).sort((a, b) => b.data - a.data)
        Teyit.length = 10
        let FinalDB = ""
        for (var i in Teyit) {
          FinalDB += `**${Teyit.indexOf(Teyit[i])+1}. ${client.users.cache.get(Teyit[i].ID.slice(6)).username}** - **${Teyit[i].data}** Coin!\n`
        }
        
        const Revenge = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .addField('Coin Leaderboards', FinalDB.replace('undefined','Donny#0000') || 'Veri Yok.')
        message.channel.send(Revenge)
  
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['rich','tm'],
    permLevel: 0
  }

  exports.help = {
    name: 'Zenginler Listesi',
    description: 'En Çok Parası Olanlar.',
    usage: 'tm'
  }