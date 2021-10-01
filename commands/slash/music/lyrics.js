const { SlashCommandBuilder } = require("@discordjs/builders");
const { Lyrics } = require("@discord-player/extractor");
const { MessageEmbed } = require("discord.js");
const lyricsFinder = Lyrics.init();
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
			let song = queue.nowPlaying();
			let lyrics = await lyricsFinder.search(song.title);
			let x = lyrics ? lyrics.lyrics : "No lyrics found";

			let lyricsEmbed = new MessageEmbed()
				.setColor(`RANDOM`)
				.setTitle(`Lyrics for ${song.title}`)
				.setDescription(x);

			await interaction.editReply({ embeds: [lyricsEmbed] });
		}
	},
};
