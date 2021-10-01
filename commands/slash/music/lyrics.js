const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("lyrics")
		.setDescription("Get the lyrics of current playing song!"),
	execute: async (interaction) => {
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

		const queue = player.getQueue(interaction.guild.id);

		if (!queue || !queue.playing)
			return interaction.editReply({
				content: `:x: | There is no music playing in this guild !`,
				ephemeral: true,
			});
		if (queue) {
			const song = queue.nowPlaying();
			const json = await fetch(
				`https://api.popcat.xyz/lyrics?song=${encodeURIComponent(song)}`
			).then((r) => r.json());
			if (json.error) {
				return await interaction.editReply(
					`:x: | No lyrics found for this song.`
				);
			}
			const url = `${song.replace(" ", "+")}`;
			let lyrics = json.lyrics;
			if (lyrics.length > 4096)
				lyrics = `:x: | Too long to show, visit **[here](https://popcat.xyz/lyrics/${url})** For full lyrics`;
			const embed = new MessageEmbed()
				.setTitle(json.full_title === "none" ? json.title : json.full_title)
				.setURL(json.url)
				.setThumbnail(json.image)
				.setDescription("Lyrics:\n\n" + lyrics)
				.setColor(`RANDOM`);

			await interaction.editReply({ embeds: [embed] });
		}
	},
};
