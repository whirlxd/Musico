const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("pause")
		.setDescription("Pause The currently playing song."),

	async execute(interaction) {
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

		const queue = interaction.client.player.getQueue(interaction.guild.id);

		if (!queue || !queue.playing)
			return interaction.editReply({
				content: `:x: | - There is no music playing  in this guild !`,
				ephemeral: true,
			});

		if (queue) {
			let y = queue.setPaused({ paused: true });
			return interaction.editReply(
				y ? ` ⏸ | Paused !` : `:x: | Failed to pause `
			);
		}
	},
};
