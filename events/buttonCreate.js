module.exports = {
	name: "interactionCreate",

	async execute(interaction) {
		// Deconstructed client from interaction object.
		const { client, customId: command } = interaction;

		// Checks if the interaction is a button interaction (to prevent weird bugs)

		if (!interaction.isButton()) return;

		// If the interaction is not a command in cache, return error message.
		// You can modify the error message at ./messages/defaultButtonError.js file!

		if (!command) {
			return interaction.reply({
				content: `:x: | An error occurred`,
				ephemeral: true,
			});
		}
		await interaction.deferReply({ ephemeral: true });
		if (command == command) {
			require(`../controls/${command}`).execute(interaction);
		}
	},
};
