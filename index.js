const { Client, GatewayIntentBits } = require("discord.js");
const config = require("./config.json");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.once("ready", () => {});

client.on("guildMemberAdd", async (member) => {
  if (member.guild.id === config.guildId) {
    const role = member.guild.roles.cache.get(config.roleId);

    if (role) {
      try {
        await member.roles.add(role);
        const logChannel = member.guild.channels.cache.get(config.logChannelId);
        if (logChannel) {
          logChannel.send(
            `Новый пользователь <@${member.user.id}> вступил в сообщество и ему была присвоена роль <@&${role.id}>.`
          );
        }
      } catch (error) {}
    }
  }
});

client.on("guildMemberRemove", async (member) => {
  if (member.guild.id === config.guildId) {
    const logChannel = member.guild.channels.cache.get(config.logChannelId);
    if (logChannel) {
      logChannel.send(`Пользователь <@${member.user.id}> покинул сообщество.`);
    }
  }
});

client.login(config.token);