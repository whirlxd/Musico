const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("reset_commandschannel")
		.setDescription("Remove the commands channel restriction from your server"),
	execute: async (interaction) => {
		const db = interaction.client.db;
		const guild = interaction.guildId;

		if (
			!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)
		) {
			return interaction.editReply({
				content: `:x: | Manage Channels Permission is required to perform that action!`,
				ephemeral: true,
			});
		}

		if (db.has(`${guild}_cmd_channel`) === false) {
			return interaction.editReply(
				`:x: | Your guild currently has no commands channel!`
			);
		}
		const x = await db.delete(`${guild}_cmd_channel`);

		return interaction.editReply(
			x
				? `:white_check_mark: | Successfully cleared your guilds command channel , commands can now be used anywhere!`
				: `:x: | Failed to do that`
		);
	},
};
