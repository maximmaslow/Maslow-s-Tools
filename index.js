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
            `New user <@${member.user.id}> joined and was assigned the role "${role.name}".`
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
      logChannel.send(
        `User <@${member.user.id}> (${member.user.tag}) has left the server.`
      );
    }
  }
});

client.login(config.token);