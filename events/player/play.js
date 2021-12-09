const {
	MessageEmbed,
	MessageActionRow: row,
	MessageButton: button,
} = require("discord.js");
module.exports = {
	name: "trackStart",
	execute(queue, track, client) {
		const rw = new row().addComponents(
			new button().setCustomId("back").setEmoji("⏮️").setStyle("PRIMARY"),
			new button().setCustomId("pause").setEmoji("⏸️").setStyle("SUCCESS"),
			new button().setCustomId("resume").setEmoji("▶️").setStyle("SUCCESS"),
			new button().setCustomId("shuffle").setEmoji("🔁").setStyle("SUCCESS"),
			new button().setCustomId("skip").setEmoji("⏭️").setStyle("PRIMARY")
		);
		const rw2 = new row().addComponents(
			new button().setCustomId("mute").setEmoji("🔇").setStyle("DANGER"),
			new button()
				.setCustomId("volume-down")
				.setEmoji("🔉")
				.setStyle("SUCCESS"),
			new button().setCustomId("volume-up").setEmoji("🔊").setStyle("SUCCESS"),
			new button().setCustomId("filters").setEmoji("🎛️").setStyle("SUCCESS"),
			new button().setCustomId("stop").setEmoji("⏹️").setStyle("DANGER")
		);
		queue.metadata.channel.send({
			embeds: [
				new MessageEmbed()
					.setColor(`GREEN`)
					.setTitle(`🎶 | Now Playing`)
					.setDescription(`**${track.title}**`)
					.setThumbnail(track.thumbnail)
					.addField(`DURATION`, `${track.duration}s`, true)
					.addField(`REQUESTER`, `${track.requestedBy.username}`, true)
					.addField(`VIEWS`, track.views.toLocaleString(), true)
					.addField(`URL`, `**[Click Here](${track.url})**`)
					.addField(`ARTIST`, track.author, true),
			],
			components: [rw, rw2],
		});
	},
};
