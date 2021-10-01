const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "messageCreate",

	async execute(message) {
		if (
			message.content == `<@${message.client.user.id}>` ||
			(message.content == `<@!${message.client.user.id}>` &&
				!message.author.bot &&
				!message.author.system)
		) {
			const m = new MessageEmbed()
				.setColor("#0099ff")
				.setDescription(
					`Hello, I am ${message.client.user.username} and i am a small music bot!\n I'm entirely slash commands based , try doing \`\`\`/help\`\`\``
				);
			return message.reply({ embeds: [m] });
		}
	},
};
