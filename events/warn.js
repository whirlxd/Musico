const chalk = require("chalk");
module.exports = {
	name: "warn",

	execute(warning) {
		console.log(chalk.yellowBright.bold(`[WARNING]\n`) + warning);
	},
};
