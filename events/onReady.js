const chalk = require("chalk");
module.exports = {
	name: "ready",
	once: true,

	execute(client) {
		client.user.setActivity("to /help", { type: "LISTENING" });

		console.log(
			chalk.yellowBright.bold(`
  ███╗   ███╗██╗   ██╗███████╗██╗ ██████╗ ██████╗                               
  ████╗ ████║██║   ██║██╔════╝██║██╔════╝██╔═══██╗                              
  ██╔████╔██║██║   ██║███████╗██║██║     ██║   ██║                              
  ██║╚██╔╝██║██║   ██║╚════██║██║██║     ██║   ██║                              
  ██║ ╚═╝ ██║╚██████╔╝███████║██║╚██████╗╚██████╔╝                              
  ╚═╝     ╚═╝ ╚═════╝ ╚══════╝╚═╝ ╚═════╝ ╚═════╝                               
                                                                                
                      ██████╗ ██╗   ██╗    ██╗    ██╗██╗  ██╗██╗██████╗ ██╗     
                      ██╔══██╗╚██╗ ██╔╝    ██║    ██║██║  ██║██║██╔══██╗██║     
                      ██████╔╝ ╚████╔╝     ██║ █╗ ██║███████║██║██████╔╝██║     
                      ██╔══██╗  ╚██╔╝      ██║███╗██║██╔══██║██║██╔══██╗██║     
                      ██████╔╝   ██║       ╚███╔███╔╝██║  ██║██║██║  ██║███████╗
                      ╚═════╝    ╚═╝        ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝
                                                                                
  `)
		);
		console.log(
			chalk.green.bold(`[Musico] | Logged in as ${client.user.tag}!`)
		);
		console.log(
			chalk.yellow.bold(`[Musico] | Servers! ["${client.guilds.cache.size}"]`)
		);
		console.log(
			chalk.red.bold(`[Musico] | Users! ["${client.users.cache.size}"]`)
		);
		console.log(
			chalk.cyan.bold(`[Musico] | Channels! ["${client.channels.cache.size}"]`)
		);
		console.log(chalk.greenBright(`[Musico] | Loaded all (/) commands`));
	},
};
