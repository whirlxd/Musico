const { EmbedBuilder: MessageEmbed } = require("discord.js");
module.exports = {
    name: "channelEmpty",
    execute(queue) {
        queue.metadata.channel.send({
            embeds: [
                new MessageEmbed()
                    .setDescription("🎶 | Everyone left... :cry:\nI don't want to play to an empty room")
                    .setColor("Yellow"),
            ],
        });
    },
};
