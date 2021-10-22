module.exports = {
	name: "connectionError",
	execute(queue, error) {
		console.log(error);
		queue.metadata.channel.send(`:x: | An error occurred `);
	},
};
