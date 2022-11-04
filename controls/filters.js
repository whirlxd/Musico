const { ButtonBuilder: Btn, ActionRowBuilder: Row, ButtonStyle } = require("discord.js");
module.exports = {
	execute: async (interaction) => {
		const player = interaction.client.player;
		const rw = new Row().addComponents(
			new Btn()
				.setCustomId("eight_d")
				.setEmoji(`🎱`)
				.setLabel("8D")
				.setStyle(ButtonStyle.Primary),
			new Btn()
				.setCustomId("bassboost")
				.setEmoji(`🎧`)
				.setLabel("BassBoost")
				.setStyle(ButtonStyle.Primary),
			new Btn()
				.setCustomId("reverse")
				.setEmoji(`◀️`)
				.setLabel("Reverse")
				.setStyle(ButtonStyle.Primary),
			new Btn()
				.setCustomId("earrape")
				.setEmoji(`🧨`)
				.setLabel("Earrape")
				.setStyle(ButtonStyle.Primary),
		);
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
				content: "❌ | No music is being played!",
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
		interaction.editReply({
			content: `Click one below`,
			components: [rw],
			ephemeral: true,
		});
	},
};
