module.exports = {
	name: "botDisconnect",
	execute(queue) {
		queue.metadata.channel.send(
			"❌ | I was disconnected from the voice channel."
		);
	},
};
