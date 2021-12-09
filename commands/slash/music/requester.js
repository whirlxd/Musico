const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("requester")
		.setDescription("Check who requested the current playing song"),
	execute: async (interaction) => {
		const player = interaction.client.player;
		const db = interaction.client.db;
		const guild = interaction.guildId;
		const roll = db.get(`${guild}_dj_role`);
		if (!roll) {
			return interaction.editReply(
				`:x: | There is no dj role setup in your guild. Try doing \`\`\`/dj_role\`\`\``
			);
		}
		const queue = player.getQueue(interaction.guild.id);
		if (!interaction.member.roles.cache.has(roll)) {
			return interaction.editReply(":x: | You don't have the DJ role!");
		}
		if (!queue || !queue.playing)
			return interaction.editReply({
				content: `:x: | There is no music playing in this guild !`,
				ephemeral: true,
			});
		if (queue) {
			const currentTrack = queue.current;
			await interaction.editReply(
				`The current playing song was requested by <@${currentTrack.requestedBy.id}>`
			);
		}
	},
};
