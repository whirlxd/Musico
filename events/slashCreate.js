const chalk = require("chalk");
module.exports = {
	name: "interactionCreate",

	async execute(interaction) {
		// Deconstructed client from interaction object.
		const { client } = interaction;

		// Checks if the interaction is a command (to prevent weird bugs)

		if (!interaction.isCommand()) return;

		const command = client.slashCommands.get(interaction.commandName);

		// If the interaction is not a command in cache.

		if (!command) return;

		// A try to executes the interaction.

		try {
			await interaction.deferReply();
			await command.execute(interaction);
		} catch (err) {
			console.log(chalk.redBright.bold(`[ERROR \n]`) + err);
			await interaction.editReply({
				content: ":x: | An error occurred",
				ephemeral: true,
			});
		}
	},
};
