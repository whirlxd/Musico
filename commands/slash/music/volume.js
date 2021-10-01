const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("volume")
		.setDescription("check or set your volume")
		.addIntegerOption((option) =>
			option
				.setName("volume")
				.setDescription("The volume you want to set between 1 - 100")
				.setRequired(false)
		),

	async execute(interaction) {
		const player = interaction.client.player;

		if (!interaction.member.voice.channel)
			return interaction.editReply({
				content: `:x: |  You're not in a voice channel !`,
				ephemeral: true,
			});

		if (
			interaction.guild.me.voice.channel &&
			interaction.member.voice.channel.id !==
				interaction.guild.me.voice.channel.id
		)
			return interaction.editReply({
				content: `:x:| - You are not in the same voice channel !`,
				ephemeral: true,
			});

		const queue = player.getQueue(interaction.guild.id);

		if (!queue || !queue.playing)
			return interaction.editReply({
				content: `:x: |  There is no music playing  in this guild !`,
				ephemeral: true,
			});
		let volume = interaction.options.getInteger("volume");

		if (queue) {
			if (!volume) {
				return interaction.editReply(
					`🔊 | Current volume set too ${queue.volume} `
				);
			}
			if (volume.value < 0 || volume.value > 100) {
				return interaction.editReply(
					`:x: | The Volume must be within the range of 1 - 100 `
				);
			}
			let v = await queue.setVolume(volume);
			return interaction.editReply(
				v
					? `🔊 | - Volume set to ${volume}!
                             `
					: `:x: | Failed to do that!`
			);
		}
	},
};
