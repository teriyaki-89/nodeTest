const fs = require ( 'fs');
//import fs from 'fs';
//fs.writeFileSync('notes.txt','test text')


const yargs = require('yargs');

yargs.version('1.15');
yargs.command({
    command:'add',
    describe:'add a new note',
    builder: {
        title: {
            describe:'Note Title'
        }
    },
    handler: function() {
        console.log('adding a new note');
    }
})

console.log(yargs.argv)
//console.log(process.argv[2])