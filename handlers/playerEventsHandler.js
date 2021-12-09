/**
 * @param {Object} client
 * @param {String} filePath
 * @returns {void}
 */
const fs = require("fs");
const handlePlayerEvents = (client, filePath) => {
	const eventFiles = fs
		.readdirSync(`${filePath}`)
		.filter((file) => file.endsWith(".js"));
	for (const file of eventFiles) {
		const event = require(`${filePath}/${file}`);
		client.player.on(
			event.name,
			async (...args) => await event.execute(...args, client)
		);
	}
};
module.exports = handlePlayerEvents;
