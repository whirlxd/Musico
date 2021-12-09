const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	// The data needed to register slash commands to Discord.
	data: new SlashCommandBuilder()
		.setName("skip")
		.setDescription("Skip your current playing song"),

	async execute(interaction) {
		const player = interaction.client.player;

		if (!interaction.member.voice.channel)
			return interaction.editReply({
				content: `:x:|  You need to be in a voice channel to do that!`,
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

		const queue = player.getQueue(interaction.guildId);
		if (!queue || !queue.playing)
			return interaction.editReply({
				content: "❌ | No music is playing in this guild",
				ephemeral: true,
			});
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

		const currentTrack = queue.nowPlaying().title;
		if (queue.tracks.length < 1) {
			return interaction.editReply(`:x: | Only 1 song in your queue`);
		}
		const success = queue.skip();
		return interaction.editReply({
			content: success
				? ` ⏭ | Skipped **${currentTrack}**!`
				: "❌ | Failed to do that!",
		});
	},
};
