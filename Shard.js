const { ShardingManager } = require('discord.js')
const manager = new ShardingManager('./Main.js', { token: require('./ayarlar.json').token })

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`))
manager.spawn()