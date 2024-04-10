import { Client, GatewayIntentBits, Events, Interaction } from "discord.js";
import { echo } from "./commands/echo/echo";
import { configDotenv } from "dotenv";

const config = configDotenv({
  path: ".local.env",
});

// 395137116224
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const availableCommands = [echo];

client.once(Events.ClientReady, async (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  if (client.application) {
    await client.application.commands.set(availableCommands);
    console.log("info: command registered");
  }
});

client.on("interactionCreate", async (interaction: Interaction) => {
  if (interaction.isCommand()) {
    const currentCommand = availableCommands.find(
      ({ name }) => name === interaction.commandName
    );
    if (currentCommand) {
      await interaction.deferReply();
      currentCommand.execute(client, interaction);
      console.log(`info: command ${currentCommand.name} handled correctly`);
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
