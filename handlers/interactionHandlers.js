/**
 * @param {Object} client
 * @param {String} filePath
 * @returns {void}
 */
const fs = require("fs");
const handleInteractions = (client, filePath) => {
	const slashCommands = fs.readdirSync(`${filePath}/commands/slash`);

	for (const module of slashCommands) {
		const commandFiles = fs
			.readdirSync(`${filePath}/commands/slash/${module}`)
			.filter((file) => file.endsWith(".js"));

		for (const commandFile of commandFiles) {
			const command = require(`${filePath}/commands/slash/${module}/${commandFile}`);
			client.slashCommands.set(command.data.name, command);
		}
	}

	const contextMenus = fs.readdirSync(`${filePath}/commands/context-menus`);

	for (const folder of contextMenus) {
		const files = fs
			.readdirSync(`${filePath}/commands/context-menus/${folder}`)
			.filter((file) => file.endsWith(".js"));
		for (const file of files) {
			const menu = require(`${filePath}/commands/context-menus/${folder}/${file}`);
			const keyName = `${folder.toUpperCase()} ${menu.data.name}`;
			client.contextCommands.set(keyName, menu);
		}
	}
};
module.exports = handleInteractions;
