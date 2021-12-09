module.exports = {
	name: "interactionCreate",

	execute: async (interaction) => {
		// Deconstructed client from interaction object.
		const { client } = interaction;

		// Checks if the interaction is a button interaction (to prevent weird bugs)

		if (!interaction.isContextMenu()) return;

		/**********************************************************************/

		// Checks if the interaction target was a user

		if (interaction.targetType === "USER") {
			const command = client.contextCommands.get(
				"USER " + interaction.commandName
			);

			// A try to execute the interaction.

			try {
				await command.execute(interaction);
				return;
			} catch (err) {
				console.error(err);
				await interaction.reply({
					content: ":x: | An error occurred",
					ephemeral: true,
				});
				return;
			}
		}
		// Checks if the interaction target was a user
		else if (interaction.targetType === "MESSAGE") {
			/**
			 * @description The Interaction command object
			 * @type {Object}
			 */

			const command = client.contextCommands.get(
				"MESSAGE " + interaction.commandName
			);

			// A try to execute the interaction.

			try {
				await command.execute(interaction);
				return;
			} catch (err) {
				console.error(err);
				await interaction.editReply({
					content: ":x: | An error occurred",
					ephemeral: true,
				});
				return;
			}
		} else {
			return console.log(
				"Something weird happening in context menu. Received a context menu of unknown type."
			);
		}
	},
};
