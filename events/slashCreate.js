const chalk = require("chalk");
module.exports = {
	name: "interactionCreate",

	async execute(interaction) {
		// Deconstructed client from interaction object.
		const { client, guildId: guild, channelId } = interaction;

		// Checks if the interaction is a command (to prevent weird bugs)

		if (!interaction.isCommand()) return;
		if (interaction.client.db.has(`${guild}_cmd_channel`)) {
			const cmdChannel = interaction.client.db.get(`${guild}_cmd_channel`);
			if (cmdChannel !== channelId)
				return interaction.reply(
					`My commands are limited to <#${cmdChannel} in your guild!`
				);
		}
		const roll = interaction.client.db.has(`${guild}_bl_role`);
		if (roll) {
			const rolee = interaction.client.db.get(`${guild}_bl_role`);
			if (interaction.member.roles.cache.some((role) => role.id === rolee)) {
				return interaction.reply(`You have been blacklisted from using me!`);
			}
		}

		const command = client.slashCommands.get(interaction.commandName);

		// If the interaction is not a command in cache.

		if (!command) return;

		// A try to executes the interaction.

		try {
			await interaction.deferReply();
			await command.execute(interaction);
		} catch (err) {
			console.log(chalk.redBright.bold(`[ERROR]\n`) + err);
			await interaction.editReply({
				content: ":x: | An error occurred",
				ephemeral: true,
			});
		}
	},
};
