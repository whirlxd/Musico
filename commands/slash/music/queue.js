const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("queue")
		.setDescription("view your currently playing songs"),
	async execute(interaction) {
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
		const queue = player.getQueue(interaction.guildId);
		if (!queue || !queue.playing)
			return interaction.editReply({
				content: "❌ | No music is playing in this guild",
			});
		const currentTrack = queue.current;
		//CREDITS: Discord-Player Example by DevAndromeda
		const tracks = queue.tracks.slice(0, 10).map((m, i) => {
			return `${i + 1}. **${m.title}** ([link](${m.url}))`;
		});
		const embed = new MessageEmbed()
			.setColor(`RANDOM`)
			.setTitle(`Queue for ${interaction.guild.name}`)
			.setDescription(
				`__**Now Playing - ${currentTrack.title}**__\n
				${tracks.join("\n")}${
					queue.tracks.length > tracks.length
						? `\n...${
								queue.tracks.length - tracks.length === 1
									? `${queue.tracks.length - tracks.length} more track`
									: `${queue.tracks.length - tracks.length} more tracks`
						  }`
						: ""
				}`
			);

		return interaction.editReply({ embeds: [embed] });
	},
};
