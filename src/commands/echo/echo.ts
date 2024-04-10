import {
  ChatInputApplicationCommandData,
  Client,
  CommandInteraction,
  ApplicationCommandOptionType,
} from "discord.js";

export type SlashCommand = ChatInputApplicationCommandData & {
  execute: (client: Client, interaction: CommandInteraction) => void;
};

export const echo: SlashCommand = {
  name: "니코의_메아리",
  description: "따라쟁이 니코",
  options: [
    {
      required: true,
      name: "message",
      description: "니코의 외침",
      type: ApplicationCommandOptionType.String,
    },
  ],
  execute: async (_, interaction) => {
    const echoMessage = interaction.options.get("message")?.value || "";
    await interaction.followUp({
      ephemeral: true,
      content: `${process.env.NIKO_LEGEND}(니코장인) 엣헴: ${echoMessage}`,
    });
  },
};
