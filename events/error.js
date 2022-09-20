const chalk = require("chalk");
const {inspect} = require("util");
module.exports = {
    name: "error",

    execute(error) {
        console.log(chalk.redBright.bold("[ERROR] ") + inspect(error, {depth: 5}));
    },
};
