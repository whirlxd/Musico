const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("np")
		.setDescription("Check what are you playing now!"),
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
			const embed = new MessageEmbed()
				.setColor(`RANDOM`)
				.setTitle("🎶 | Now Playing")
				.setDescription(queue.nowPlaying().title)
				.setThumbnail(queue.nowPlaying().thumbnail)
				.addFields(
					{ name: "Uploader", value: queue.nowPlaying().author, inline: true },
					{
						name: "Duration",
						value: queue.nowPlaying().duration + "s",
						inline: true,
					},
					{
						name: "Requested By",
						value: queue.nowPlaying().requestedBy.username,
						inline: true,
					},
					{
						name: "Views",
						value: queue.nowPlaying().views.toString(),
						inline: true,
					},
					{
						name: "Progress Bar",
						value: queue.createProgressBar({ timecodes: true }),
					}
				);

			return interaction.editReply({ embeds: [embed] });
		}
	},
};
