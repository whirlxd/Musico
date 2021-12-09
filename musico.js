/*
* @License GNU[2]
* @Author: Whirl <hello@whirl.codes>
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

/**
 * Ah yes requiring every fucking thing from this universe
 */
const { Collection, Intents, Client } = require("discord.js");
const { Player } = require("discord-player");
const db = require("quick.db");
const config = require("./musico.config");
const handleEvents = require("./handlers/eventsHandler");
const handleInteractions = require("./handlers/interactionHandlers");
const registrar = require("./handlers/registrar");
const handlePlayer = require("./handlers/playerEventsHandler");

const client = new Client({
	intents: [
		//yeah this sux
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_VOICE_STATES,
	],
});
/**
 * Global variables< Client and Player... etc.>
 */
const players = new Player(client);
client.slashCommands = new Collection();
client.contextCommands = new Collection();
client.db = db;
client.player = players;
client.config = config;
/**
 * Handle events , handle interactions and register commands
 */
handleEvents(client, `${__dirname}/events`);
handlePlayer(client, `${__dirname}/events/player`);
handleInteractions(client, __dirname);
registrar(client);
/**
 * Login to the bot
 */
client.login(client.config.botToken);
