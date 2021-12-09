const { SlashCommandBuilder } = require("@discordjs/builders");
const clean = require("../../../clean").default;
const { MessageEmbed: Embed } = require("discord.js");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("eval")
		.setDescription("Evaluate a javascript expression")
		.addStringOption((option) =>
			option
				.setName("expression")
				.setDescription("The code to evaluate")
				.setRequired(true)
		),
	execute: async (interaction) => {
		const string = interaction.options.getString("expression");
		if (interaction.member.id !== interaction.client.config.ownerId) {
			return interaction.editReply({
				content: "This command can only be used by the developer of the bot!",
				ephemeral: true,
			});
		}
		try {
			const evaled = eval(string);

			const cleaned = await clean(interaction.client, evaled);
			const emb = new Embed()
				.setTitle("Evaluation | Success")
				.setDescription(`\`\`\`js\n${cleaned}\`\`\``)
				.setColor(`GREEN`)
				.setFooter(
					`Evaluated by ${interaction.member.displayName}`,
					interaction.member.user.avatarURL({ dynamic: true })
				);

			return interaction.channel.send({
				embeds: [emb],
			});
		} catch (err) {
			const emb = new Embed();
			emb.setColor(`RED`);
			emb.setDescription(`\`\`\`js\n${clean(err)}\`\`\``);
			emb.setTitle("Evaluation | Error");
			emb.setFooter(
				`Evaluated by ${interaction.member.displayName}`,
				interaction.member.user.avatarURL({ dynamic: true })
			);
			return interaction.channel.send({
				embeds: [emb],
			});
		}
	},
};
