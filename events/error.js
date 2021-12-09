const chalk = require("chalk");
module.exports = {
	name: "error",

	execute(error) {
		console.log(chalk.redBright.bold(`[ERROR]\n`) + error);
	},
};
