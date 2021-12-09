const { MessageEmbed } = require("discord.js");
module.exports = {
	name: "queueEnd",
	execute(queue) {
		queue.metadata.channel.send({
			embeds: [
				new MessageEmbed()

					.setDescription("🎶 | The queue has ended, leaving the channel now.")
					.setColor(`YELLOW`),
			],
		});
	},
};
