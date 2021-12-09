/**
 * @param {object} client
 * @param  {string} filePath
 * @returns {void}
 */
const fs = require("fs");
const handleEvents = (client, filePath) => {
	const eventFiles = fs
		.readdirSync(`${filePath}`)
		.filter((file) => file.endsWith(".js"));
	for (const file of eventFiles) {
		const event = require(`${filePath}/${file}`);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args, client));
		} else {
			client.on(
				event.name,
				async (...args) => await event.execute(...args, client)
			);
		}
	}
};
module.exports = handleEvents;
