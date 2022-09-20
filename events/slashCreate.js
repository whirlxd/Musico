const chalk = require("chalk");

module.exports = {
    name: "interactionCreate",

    async execute(interaction) {
        // Deconstructed client from interaction object.
        const { client, guildId, channelId } = interaction;

        // If it's not a valid command, just return
        if (!interaction.isCommand()) return;


        // If the bot's commands are limited to a certain channel, warn them if it's wrong
        const hasChan = await interaction.client.db.has(`${guildId}_cmd_channel`);
        if (hasChan) {
            const cmdChannelId = await interaction.client.db.get(`${guildId}_cmd_channel`);
            if (cmdChannelId !== channelId) {
                return interaction.reply({content: `My commands are limited to <#${cmdChannelId}> in your guild!`, ephemeral: true});
            }
        }

        // If the user has been blacklisted,
        const blRoleId = interaction.client.db.has(`${guildId}_bl_role`);
        if (blRoleId) {
            const blRole = interaction.client.db.get(`${guildId}_bl_role`);
            if (interaction.member.roles.cache.some((role) => role.id === blRole)) {
                return interaction.reply({content: "You have been blacklisted from using me!", ephemeral: true});
            }
        }

        // Grab the command info
        const command = client.slashCommands.get(interaction.commandName);

        // If the interaction is not a viable command, don't do anything
        if (!command) return;

        // Try to execute the interaction
        try {
            await interaction.deferReply();
            await command.execute(interaction);
        } catch (err) {
            console.log(chalk.redBright.bold("[ERROR]\n") + err);
            await interaction.editReply({
                content: ":x: | An error occurred",
                ephemeral: true,
            });
        }
    },
};
