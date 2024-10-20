const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
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
          const embed = new EmbedBuilder()
            .setColor("Blue")
            .setAuthor({
              name: member.user.tag,
              iconURL: member.user.displayAvatarURL(),
            })
            .setDescription(
              `**Пользователь <@${member.user.id}> вступил в сообщество**`
            );

          logChannel.send({ embeds: [embed] });
        }
      } catch (error) {}
    }
  }
});

client.on("guildMemberRemove", async (member) => {
  if (member.guild.id === config.guildId) {
    const logChannel = member.guild.channels.cache.get(config.logChannelId);
    if (logChannel) {
      const embed = new EmbedBuilder()
        .setColor("Orange")
        .setAuthor({
          name: member.user.tag,
          iconURL: member.user.displayAvatarURL(),
        })
        .setDescription(
          `**Пользователь <@${member.user.id}> покинул сообщество**`
        );

      logChannel.send({ embeds: [embed] });
    }
  }
});

client.login(config.token);
