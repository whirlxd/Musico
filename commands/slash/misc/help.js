const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("List all commands of bot"),

	async execute(interaction) {
		const commands = interaction.client.slashCommands;

		const helpEmbed = new MessageEmbed()
			.setColor(0x4286f4)
			.setTitle("**Musico Help**");

		commands.map((command) =>
			helpEmbed.addField(
				command.data.name.toLowerCase(),
				command.data.description,
				true
			)
		);
		const kool = new MessageActionRow().addComponents(
			new MessageButton()
				.setLabel("Invite")
				.setStyle("LINK")
				.setURL("https://example.com")
				.setEmoji("864902320789913650"),
			new MessageButton()
				.setLabel("Github")
				.setStyle("LINK")
				.setURL("https://github.com/Whirl21/Musico")
				.setEmoji("744345792172654643")
		);
		await interaction.editReply({
			embeds: [helpEmbed],
			components: [kool],
		});
	},
};
