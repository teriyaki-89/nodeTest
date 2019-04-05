//console.log('hello world')

const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');
// console.log(notes());

// console.log(chalk.keyword('orange')('Yay for orange colored text!'));
// console.log(chalk.rgb(123, 45, 67).underline('Underlined reddish color'));
// console.log(chalk.hex('#DEADED').bold('Bold gray!'))
// const color = process.argv[2];
// console.log(process.argv);

//console.log(chalk.hex('#DEADED')[color]('Bold gray!'))
//console.log(color)
yargs.command({
    command: 'add',
    description: 'Add Note',
    builder: {
        title: {
            describe: 'text Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'body text',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        let result = notes.addNotes(argv.title, argv.body);
        //console.log(result)
    }
})
yargs.command({
    command: 'remove',
    description: 'delete',
    builder: {
        body: {
            describe: 'body text',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        console.log('deleting ' + argv.body);
    }
})
//console.log(yargs.argv);
yargs.parse();