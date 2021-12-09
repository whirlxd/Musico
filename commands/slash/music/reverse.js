const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("reverse")
		.setDescription("Toggle reverse on or off")
		.addBooleanOption((option) =>
			option
				.setName("enabled")
				.setDescription("enable/disable the reverse filter")
		),
	execute: async (interaction) => {
		const player = interaction.client.player;
		if (!interaction.member.voice.channel)
			return interaction.editReply({
				content: `:x:|  You need to be in a voice channel to do this!`,
				ephemeral: true,
			});

		if (
			interaction.guild.me.voice.channel &&
			interaction.member.voice.channel.id !==
				interaction.guild.me.voice.channel.id
		)
			return interaction.editReply({
				content: `❌ | You need to be in the same voice channel as me to do that`,
				ephemeral: true,
			});
		const queue = player.getQueue(interaction.guild.id);
		if (!queue || !queue.playing) {
			return interaction.editReply({
				content: `❌ | There is nothing playing right now!`,
				ephemeral: true,
			});
		}
		if (queue) {
			const db = interaction.client.db;
			const guild = interaction.guildId;
			const roll = db.get(`${guild}_dj_role`);

			if (
				interaction.user.id !== queue.nowPlaying().requestedBy.id &&
				!interaction.member.roles.cache.has(roll)
			) {
				return interaction.editReply(
					":x: | This command can only be used by the person who played the current track or someone who has your guild's DJ role"
				);
			}
			if (
				interaction.user.id !== queue.nowPlaying().requestedBy.id &&
				!interaction.member.roles.cache.has(roll)
			) {
				return interaction.editReply(
					":x: | This command can only be used by the person who played the current track or someone who has your guild's DJ role"
				);
			}
			const lol = interaction.options.getBoolean("enabled");
			if (lol) {
				queue.setFilters({
					reverse: true,
					normalizer2: true,
				});
				return interaction.editReply(
					`🎧 | Successfully enabled Reverse on your current queue`
				);
			}
			if (!lol) {
				queue.setFilters({
					reverse: false,
					normalizer2: false,
				});
				return interaction.editReply(
					`🎧 | Successfully disabled Reverse on your current queue`
				);
			}
		}
	},
};
