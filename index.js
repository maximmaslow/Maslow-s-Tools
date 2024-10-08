// Import required libraries
const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');

// Create a new client instance for the bot
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,          // Intent to access basic guild (server) information
    GatewayIntentBits.GuildMembers     // Intent to track member join events
  ]
});

// Triggered when the bot is successfully logged in and ready
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Event handler for when a new member joins the guild
client.on('guildMemberAdd', async (member) => {
  // Ensure the bot is working on the correct server
  if (member.guild.id === config.guildId) {
    // Get the role from the configuration
    const role = member.guild.roles.cache.get(config.roleId);

    // If the role exists, assign it to the new member
    if (role) {
      try {
        await member.roles.add(role);
        console.log(`Assigned role "${role.name}" to user "${member.user.tag}".`);

        // Log the event in the specified log channel
        const logChannel = member.guild.channels.cache.get(config.logChannelId);
        if (logChannel) {
          logChannel.send(`New user ${member.user.tag} joined and was assigned the role "${role.name}".`);
        }
      } catch (error) {
        console.error(`Failed to assign role: ${error}`);
      }
    } else {
      console.error('Role not found');
    }
  }
});

// Log in using the bot token from config.json
client.login(config.token);