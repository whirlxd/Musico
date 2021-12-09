const { QueryType } = require("discord-player");
module.exports = {
	data: {
		name: "add_to_queue",
		type: 3, // 3 is for message context menus
	},

	async execute(interaction) {
		const query = interaction.options.getMessage("message");

		await interaction.deferReply();
		if (!interaction.member.voice.channelId)
			return await interaction.editReply({
				content: "❌ | You need to be in a voice channel!",
				ephemeral: true,
			});
		if (
			interaction.guild.me.voice.channelId &&
			interaction.member.voice.channelId !==
				interaction.guild.me.voice.channelId
		)
			return await interaction.editReply({
				content:
					"❌ | You need to be in the same voice channel as me to do that",
				ephemeral: true,
			});

		const queue = interaction.client.player.createQueue(interaction.guild, {
			metadata: {
				channel: interaction.channel,
			},
		});

		// verify vc connection
		try {
			if (!queue.connection)
				await queue.connect(interaction.member.voice.channel);
		} catch {
			queue.destroy();
			return await interaction.editReply({
				content: "❌ | Could not join your voice channel!",
				ephemeral: true,
			});
		}

		const track = await interaction.client.player.search(query, {
			requestedBy: interaction.user,
			searchEngine: QueryType.AUTO,
		});

		if (!track || !track.tracks.length)
			return await interaction.editReply({
				content: `❌ | No Video/Song/Playlist was found when searching for : ${track}`,
				ephemeral: true,
			});

		const playEmbed = new MessageEmbed()
			.setColor(`RANDOM`)
			.setTitle(
				`🎶 | New ${track.playlist ? "playlist" : "song"} Added to queue`
			);
		if (!track.playlist) {
			playEmbed.setThumbnail(track.thumbnail);
			playEmbed.setDescription(`${track.title}`);

			playEmbed.setFooter(
				`Requested by ${track.requestedBy.username} | Made By Whirl#0021`
			);
		}

		if (!queue.playing) {
			track.playlist
				? queue.addTracks(track.tracks)
				: queue.play(track.tracks[0]);
			return await interaction.editReply({ embeds: [playEmbed] });
		} else if (queue.playing) {
			track.playlist
				? queue.addTracks(track.tracks)
				: queue.addTrack(track.tracks[0]);
			return await interaction.editReply({
				embeds: [playEmbed],
			});
		}
	},
};
