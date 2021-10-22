const {
	MessageEmbed,
	MessageActionRow,
	MessageButton,
	Permissions,
} = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("List all commands of bot"),

	async execute(interaction) {
		const commands = interaction.client.slashCommands;
		const client = interaction.client;

		const helpEmbed = new MessageEmbed()
			.setColor(`RED`)
			.setAuthor(
				`${interaction.user.username}`,
				`${interaction.user.avatarURL({ dynamic: true })}`,
				`https://discord.com/users/${interaction.user.id}`
			)
			.setTitle("**Musico Help**")
			.setThumbnail(client.user.avatarURL({ dynamic: true }))
			.setFooter(
				`Copyright ©️ ${
					client.user.username
				} ${new Date().getFullYear()} | Created by Whirl#5402`,
				client.user.avatarURL({ dynamic: true })
			);
		commands.map((command) =>
			helpEmbed.addField(
				command.data.name.toLowerCase(),
				command.data.description,
				true
			)
		);
		const invite = client.generateInvite({
			permissions: [Permissions.FLAGS.ADMINISTRATOR],
			scopes: ["bot", "applications.commands"],
		});
		const kool = new MessageActionRow().addComponents(
			new MessageButton()
				.setLabel("Invite")
				.setStyle("LINK")
				.setURL(invite)
				.setEmoji("864902320789913650"),
			new MessageButton()
				.setLabel("Github")
				.setStyle("LINK")
				.setURL("https://github.com/Whirl21/Musico")
				.setEmoji("744345792172654643"),
			new MessageButton()
				.setLabel("Website")
				.setStyle("LINK")
				.setURL("https://whirl.codes")
				.setEmoji("🌐")
		);

		await interaction.editReply({
			embeds: [helpEmbed],
			components: [kool],
		});
	},
};
