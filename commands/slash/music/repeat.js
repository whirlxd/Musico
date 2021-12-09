const { SlashCommandBuilder } = require("@discordjs/builders");
const { QueueRepeatMode } = require("discord-player");
/**
 * @Param {String}
 */
module.exports = {
	// The data needed to register slash commands to Discord.
	data: new SlashCommandBuilder()
		.setName("repeat")
		.setDescription("Go into a loop mode ")
		.addStringOption((option) =>
			option
				.setName("mode")
				.setDescription("The repeat mode you want")
				.setRequired(true)
				.addChoice("OFF", "OFF")
				.addChoice("Queue", "QUEUE")
				.addChoice("Track", "TRACK")
		),

	async execute(interaction) {
		const player = interaction.client.player;
		if (!interaction.member.voice.channel)
			return interaction.editReply({
				content: `:x: |  You need to be in a voice channel to do that!`,
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
				content: `:x: |  There is no music playing in this guild !`,
				ephemeral: true,
			});
		if (queue) {
			const loop = interaction.options.getString("mode");

			if (loop === "OFF") {
				const x = await queue.setRepeatMode(QueueRepeatMode.OFF);
				return await interaction.editReply(
					x
						? `🔁 | Successfully set the loop mode to ${loop}`
						: `:x: | Failed to do that`
				);
			} else if (loop === "TRACK") {
				const x = await queue.setRepeatMode(QueueRepeatMode.TRACK);
				return await interaction.editReply(
					x
						? `🔁 | Successfully set the loop mode to ${loop}`
						: `:x: | Failed to do that`
				);
			} else if (loop === "QUEUE") {
				const x = await queue.setRepeatMode(QueueRepeatMode.QUEUE);
				return await interaction.editReply(
					x
						? `🔁 | Successfully set the loop mode to ${loop}`
						: `:x: | Failed to do that`
				);
			}
		}
	},
};
