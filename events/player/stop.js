const { EmbedBuilder: MessageEmbed } = require("discord.js");
module.exports = {
    name: "queueEnd",
    execute(queue) {
        queue.metadata.channel.send({
            embeds: [
                new MessageEmbed()
                    .setDescription("🎶 | The queue has ended.")
                    .setColor("Yellow"),
            ],
        });
    },
};
