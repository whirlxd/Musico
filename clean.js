/**
 
 * @param  {Object} client
 * @param  {String} text
 * @return {String} text with all the cleanups applied

 */
const clean = async (client, text) => {
	// If our input is a promise, await it before continuing
	if (text && text.constructor.name == "Promise") text = await text;

	if (typeof text !== "string")
		text = require("util").inspect(text, { depth: 1 });

	text = text
		.replace(/`/g, "`" + String.fromCharCode(8203))
		.replace(/@/g, "@" + String.fromCharCode(8203))
		.replaceAll(client.token, "T0$&N^");

	// Send off the cleaned up result
	return text;
};
module.exports = clean;
