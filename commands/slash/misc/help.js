const {
    EmbedBuilder: MessageEmbed,
    ActionRowBuilder: MessageActionRow,
    ButtonBuilder: MessageButton,
    PermissionsBitField,
} = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("List all commands of bot"),

    async execute(interaction) {
        const commands = interaction.client.slashCommands;
        const client = interaction.client;

        const helpEmbed = new MessageEmbed()
            .setColor("Red")
            .setAuthor({
                name: `${interaction.user.username}`,
                iconURL: `${interaction.user.avatarURL({ dynamic: true })}`,
                url: `https://discord.com/users/${interaction.user.id}`
            })
            .setDescription(
                `Hey there! I am ${client.user.username}, a  bot programmed by **[Whirl](https://github.com/Whirl21)** to help you with playing music.\n I support Spotify/YouTube/SoundCloud and my commands are listed below -`
            )
            .setTitle(`**${client.user.username}**`)
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .setFooter({
                text: `${client.user.username.toUpperCase()} ${new Date().getFullYear()}`,
                iconURL: client.user.avatarURL({ dynamic: true })
            })
            .setTimestamp();

        commands.map((command) =>
            helpEmbed.addFields({
                name: `>>> \`/${command.data.name.toLowerCase().replace("_", "-")}\``,
                value: command.data.description,
                inline: true
            })
        );
        const invite = client.generateInvite({
            permissions: [PermissionsBitField.Flags.Administrator],
            scopes: ["bot", "applications.commands"],
        });
        const kool = new MessageActionRow().addComponents(
            new MessageButton()
                .setLabel("Invite")
                .setStyle("LINK")
                .setURL(invite)
                .setEmoji("🔗"),
            new MessageButton()
                .setLabel("Github")
                .setStyle("LINK")
                .setURL("https://github.com/Whirl21/Musico")
                .setEmoji("744345792172654643"),
            new MessageButton()
                .setLabel("Website")
                .setStyle("LINK")
                .setURL("https://whirl.codes")
                .setEmoji("🌐")
        );

        await interaction.editReply({
            embeds: [helpEmbed],
            components: [kool],
        });
    },
};
