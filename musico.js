/*
* @License [GNU2]
Copyright (C) 2021 Whirl

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/
const fs = require("fs");
const { Collection, Intents, MessageEmbed, Client } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { token, client_id } = require("./musico.config.json");
const { Player } = require("discord-player");
const db = require("quick.db");

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,

		Intents.FLAGS.GUILD_VOICE_STATES,
	],
});

const eventFiles = fs
	.readdirSync("./events")
	.filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(
			event.name,
			async (...args) => await event.execute(...args, client)
		);
	}
}

/**********************************************************************/
// Define All global client options
const players = new Player(client);
client.slashCommands = new Collection();
client.contextCommands = new Collection();
client.db = db;
client.player = players;

/********************* */
//ALL MUSIC PLAYER EVENTS
client.player.on("trackStart", (queue, track) => {
	queue.metadata.channel.send({
		embeds: [
			new MessageEmbed()
				.setColor(`RANDOM`)
				.setTitle(`Now Playing`)
				.setDescription(`**${track.title}**`)
				.setThumbnail(track.thumbnail)
				.addField(`Duration`, `${track.duration}s`, true)
				.addField(`Requested By`, `${track.requestedBy.username}`, true)
				.addField(`Views`, track.views.toString(), true)
				.addField(`URL`, `**[Click Here](${track.url})**`)
				.addField(`ARTIST`, track.author, true)
				.setFooter(`© ${client.user.username} 2021 | Made By Whirl#0021`),
		],
	});
});
client.player.on("botDisconnect", (queue) => {
	queue.metadata.channel.send(
		"❌ | I was disconnected from the voice channel."
	);
});
client.player.on("error", (queue, error) => {
	console.log(error);
	queue.metadata.channel.send(`:x: | An error occurred `);
});

client.player.on("queueEnd", (queue) => {
	queue.metadata.channel.send({
		embeds: [
			new MessageEmbed()

				.setDescription("The queue has ended, leaving the channel now.")
				.setColor(`YELLOW`),
		],
	});
});

//END
/**********************************************************************/

const slashCommands = fs.readdirSync("./commands/slash");

for (const module of slashCommands) {
	const commandFiles = fs
		.readdirSync(`./commands/slash/${module}`)
		.filter((file) => file.endsWith(".js"));

	for (const commandFile of commandFiles) {
		const command = require(`./commands/slash/${module}/${commandFile}`);
		client.slashCommands.set(command.data.name, command);
	}
}

const contextMenus = fs.readdirSync("./commands/context-menus");

for (const folder of contextMenus) {
	const files = fs
		.readdirSync(`./commands/context-menus/${folder}`)
		.filter((file) => file.endsWith(".js"));
	for (const file of files) {
		const menu = require(`./commands/context-menus/${folder}/${file}`);
		const keyName = `${folder.toUpperCase()} ${menu.data.name}`;
		client.contextCommands.set(keyName, menu);
	}
}

const rest = new REST({ version: "9" }).setToken(token);

const commandJsonData = [
	...Array.from(client.slashCommands.values()).map((c) => c.data.toJSON()),
	...Array.from(client.contextCommands.values()).map((c) => c.data),
];

(async () => {
	try {
		await rest.put(Routes.applicationCommands(client_id), {
			body: commandJsonData,
		});
	} catch (error) {
		console.error(error);
	}
})();

/**********************************************************************/

// Login into your client application with bot's token.

client.login(token);
