const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("seek")
		.setDescription("Check what are you playing now!")
		.addStringOption((option) =>
			option
				.setName("time")
				.setDescription("The time to skip to")
				.setRequired(true)
		),
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
			let time = interaction.options.getInteger("time") * 100;

			let ttr = queue.seek(time);
			return interaction.reply(
				ttr
					? ` ⏩ |  Seeked to ${time / 100} seconds !`
					: `:x: | Failed to do that !`
			);
		}
	},
};
