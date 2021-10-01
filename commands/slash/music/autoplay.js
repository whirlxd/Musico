const { SlashCommandBuilder } = require("@discordjs/builders");
const { QueueRepeatMode } = require("discord-player");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("autoplay")
		.setDescription("Toggle AutoPlay on or off")
		.addBooleanOption((option) =>
			option.setName("enabled").setDescription("enable/disable the AutoPlay")
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
			const lol = interaction.options.getBoolean("enabled");
			if (lol) {
				const x = await queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);
				return interaction.editReply(`🤖 | Successfully enabled AutoPlay`);
			}
			if (!lol) {
				const x = await queue.setRepeatMode(QueueRepeatMode.OFF);
				return interaction.editReply(`🤖 | Successfully disabled AutoPlay`);
			}
		}
	},
};
